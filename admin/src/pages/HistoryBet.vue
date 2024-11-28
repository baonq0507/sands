<script setup>
import { ref, onMounted, reactive, watch } from 'vue';
import Header from '@/components/admin/Header.vue';
import Footer from '@/components/admin/Footer.vue';
import axios from '@/common/axios.js';
import { cloneDeep } from 'lodash-es';
import { formatDateTime } from '@/common';
import { listGame } from '../common/constants';
import { useRouter } from 'vue-router';
import { socket } from "@/socket";
import { layer } from "@layui/layer-vue";

const router = useRouter();
const user = ref(null)
// get game code from url
const gameCode = router.currentRoute.value.params.code;
const betDataOnServer = ref({});
const formState = reactive({
    betData: '',
});
const dataSource = ref([]);
const mode = ref('top');
// const activeKey = ref(2);
const callback = val => {
    // console.log(val);
    // callback function for tab scroll
};
const onFinish = values => {
    // console.log('Success:', values);
    const data = {
        betData: values.betData,
        sessionID: betDataOnServer.value._id
    }
    socket.emit('controllgame', data)
};
const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);

};
// update data for table when get data from server
const updateData = (data) => {
    const valueToMessage = {
        1: "Lớn",
        2: "Nhỏ",
        3: "Lẻ",
        4: "Chẵn"
    };

    return data.map((item) => {
        // Trích xuất username
        const username = item?.user?.username;

        const idToMessage = ["số đầu tiên", "số thứ hai", "số thứ ba", "số thứ tư", "số thứ năm"];

        // crate message for each betInUser
        const messages = item.betInUser.map((bet, index) => {
            const idMessage = idToMessage[index] || `số thứ ${index + 1}`;
            const valueMessage = valueToMessage[bet.value] || `value ${bet.value}`;
            return `${idMessage}: ${valueMessage}`;
        });

        // Ghép các message lại với nhau
        // Ví dụ: "số đầu tiên: lớn\nsố thứ hai: nhỏ\nsố thứ ba: lẻ\nsố thứ tư: chẵn\nsố thứ năm: lớn"

        // Merge messages together
        // For example: "first number: large\n second number: small\n third number: odd\n fourth number: even\n third number: large"
        const finalMessage = messages.join("\n");

        // Trả về đối tượng mới với các trường đã cập nhật
        // Returns a new object with updated fields
        console.log(item);
        return {
            ...item,
            resultSession: item?.betData ? item.betData.betData.join(',') : '',
            username: username,
            betInUserText: finalMessage,
            id: item?.betData ? item.betData.id : '',

        };
    });
};
const changeTab = (e) => {
        axios.get(`/history/get`).then((res) => {
            const data = updateData(res.docs);
            console.log(data);
            dataSource2.value = cloneDeep(data);
            pagination.value = {
                ...pagination.value,
                total: res.totalDocs + 1,
                pageSize: res.limit,
                current: res.page,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: total => `Tổng kết qủa ${res.totalDocs} kết quả`,
            }
        }).catch((err) => {
            console.log(err);
        });
}
const dataSource2 = ref([]);

const run = async (params = {}) => {
    const data = {
        ...params,
        gameCode: gameCode,
    }
    console.log(data);
    const res = await axios.get(`/history/get`, { params: data });
    const dataUpdate = updateData(res.docs);
    console.log(dataUpdate);
    dataSource2.value = cloneDeep(dataUpdate);
    pagination.value = {
        ...pagination.value,
        total: res.totalDocs + 1,
        pageSize: res.limit,
        current: res.page,
        showSizeChanger: true,
        showQuickJumper: true,
        showTotal: total => `Tổng kết qủa ${res.totalDocs} kết quả`,
    }
}
const handleTableChange = (pag, filters, sorter) => {
    run({
        results: pag.pageSize,
        page: pag?.current,
        sortField: sorter.field,
        sortOrder: sorter.order,
        ...filters,
    });
};
const columns = [
    {
        title: 'Người dùng',
        dataIndex: 'username',
        key: 'username',
    },
    {
        title: 'Tiền cược',
        dataIndex: 'amount',
        key: 'amount',
    },
    {
        title: 'Số đặt cược',
        dataIndex: 'betInUserText',
        key: 'betInUserText',
    },
    {
        title: 'Thời gian',
        dataIndex: 'createAt',
        key: 'createAt',
        customRender: (text) => {
            return formatDateTime(text.text)
        }
    },
]
const columns2 = [
    {
        title: 'Phiên ID',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Người dùng',
        dataIndex: 'username',
        key: 'username',
    },
    {
        title: 'Tiền cược',
        dataIndex: 'amount',
        key: 'amount',
    },
    {
        title: 'Số dư trước cược',
        dataIndex: 'beforeOnWin',
        key: 'beforeOnWin'
    },
    {
        title: 'Số tiền thay đổi',
        dataIndex: 'interest',
        key: 'interest'
    },
    {
        title: 'Số dư sau cược',
        dataIndex: 'afterOnWin',
        key: 'afterOnWin'
    },
    {
        title: 'Số đặt cược',
        dataIndex: 'betInUserText',
        key: 'betInUserText',
    },
    {
        title: 'Tên game',
        dataIndex: 'code',
        key: 'code',
    },
    {
        title: 'kết quả phiên',
        dataIndex: 'resultSession',
        key: 'resultSession',
    },
    {
        title: 'Thời gian',
        dataIndex: 'createAt',
        key: 'createAt',
        customRender: (text) => {
            return formatDateTime(text.text)
        }
    },
]
const pagination = ref({
    current: 1,
    pageSize: 10,
    total: 0,
    showSizeChanger: true,
    showQuickJumper: true,
    showTotal: total => `Tổng kết qủa ${total} kết quả`,
})

onMounted(() => {
    axios('/me/profile').then((res) => {
        user.value = res.user;
        // socket.on(gameCode, async (dataBet) => {
        //     betDataOnServer.value = dataBet
        // })
        changeTab();
    }).catch((err) => {
        console.log(err);
    });


});

watch(() => betDataOnServer.value._id, (newVal) => {
    if (newVal) {
        axios.get(`/history/id/${newVal}`).then((res) => {

            // dataSource.value = res;
            const data = updateData(res);
            dataSource.value = cloneDeep(data);

        }).catch((err) => {
            console.log(err);
        });
    }
});
const searchValue = ref('');
const onSearch = (value) => {
    run({
        username: value,
    });
}

const searchValue2 = ref('');

const onSearch2 = (value) => {
    run({
        search: value
    });
}

</script>
<template>
    <a-layout>
        <Header :selectedKeys="[2]"></Header>
        <a-layout-content style="padding: 20px 50px">

            <div :style="{ background: '#fff', padding: '12px', minHeight: '100vh' }">
                <h3>Lịch sử đặt cược</h3>

                <!-- <div class="game_controll" style="margin-top: 10px;">
                    <p>thời gian: {{ betDataOnServer.timeRemain }}</p>
                    <p>Kêt quả: {{ betDataOnServer.betData }}</p>
                    <div id="controll">
                        <a-form :model="formState" name="basic" :wrapper-col="{ span: 8 }" autocomplete="off"
                            @finish="onFinish" @finishFailed="onFinishFailed"
                            v-if="user && user.permissions.game.includes('edit')">
                            <a-form-item label="Kết quả mới" name="betData"
                                :rules="[{ required: true, message: 'Vui lòng nhập kết quả' }]">
                                <a-input v-model:value="formState.betData" placeholder="1,2,3,4,5" />
                            </a-form-item>
                            <a-form-item>
                                <a-button type="primary" html-type="submit">Cập nhật</a-button>
                            </a-form-item>
                        </a-form>
                    </div>
                    <div id="onBet">
                        <a-tabs @change="changeTab" :tab-position="mode" @tabScroll="callback">
                            <a-tab-pane key="1" tab="Hiện tại">
                                <a-table :columns="columns" :data-source="dataSource" bordered>
                                </a-table>
                            </a-tab-pane>
                            <a-tab-pane key="2" tab="Tất cả">
                                <a-row gutter="10">
                                    <a-col :span="12">
                                        <a-input-search style="margin-bottom: 10px;" v-model:value="searchValue"
                                            @search="onSearch" placeholder="Tìm kiếm người dùng" />
                                    </a-col>
                                    <a-col :span="12" style="text-align: right;">
                                        <a-input-search style="margin-bottom: 10px;" v-model:value="searchValue2"
                                            @search="onSearch2" placeholder="Tìm kiếm khác" />
                                    </a-col>
                                </a-row>

                                <a-table @change="handleTableChange" :columns="columns2" :data-source="dataSource2"
                                    bordered :pagination="pagination">
                                </a-table>
                            </a-tab-pane>
                        </a-tabs>

                    </div>
                </div> -->
                <a-row gutter="10">
                    <a-col :span="12">
                        <a-input-search style="margin-bottom: 10px;" v-model:value="searchValue" @search="onSearch"
                            placeholder="Tìm kiếm người dùng" />
                    </a-col>
                    <a-col :span="12" style="text-align: right;">
                        <a-input-search style="margin-bottom: 10px;" v-model:value="searchValue2" @search="onSearch2"
                            placeholder="Tìm kiếm khác" />
                    </a-col>
                </a-row>
                <a-table :scroll="{ x: 1500, y: 700 }" @change="handleTableChange" :columns="columns2"
                    :data-source="dataSource2" bordered :pagination="pagination">
                </a-table>
            </div>
        </a-layout-content>
        <Footer></Footer>
    </a-layout>
</template>

<style>
#app {
    margin: 0;
    max-width: 100% !important;
    overflow-x: hidden;
}
</style>
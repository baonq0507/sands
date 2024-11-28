<script setup>
import { HomeOutlined, SearchOutlined } from '@ant-design/icons-vue';
import { ref, onMounted } from 'vue';
import axios from '../common/axios.js';
import { getStorage } from '../common';
import { layer } from '@layui/layer-vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const activeKey = ref('overview');
const activeKeyNewAcc = ref('1');

const openTab = (key) => {
    if (key === 'report') {
        layer.msg('Bạn không phải đại lý', {
            icon: 2,
            time: 2000
        });
        activeKeyNewAcc.value = 'normal';
        return
    }
    activeKey.value = key;
}
const formState = ref({
    typeNew: '1',
    numUse: '',
    discount: '',
    username: '',
    status: '1',
    code: '',
    startTime: '',
    endTine: '',
});
const changeTypeNewAcc = (key) => {

    // typeNewAcc.value = key;
}
const user = ref(getStorage('user'));

onMounted(() => {
    axios.get('/me/profile').then((res) => {
        user.value = res.user;
    }).catch((err) => {
        console.log(err);
        router.push('/login');
    });
})
const onFinish = values => {
    console.log('Success:', values);
    layer.msg('Bạn không phải đại lý', {
        icon: 2,
        time: 2000
    });
};
const typeNewAcc = ref('normal');
const refRegister = ref(import.meta.env.VITE_BASE_URL + '/register?ref=' + user.value.inviteCode);
const valueGame = ref('1');
const valueStatus = ref('1');
</script>
<template>
    <div id="game">
        <div class="info">
            <a-space align="center" style="display: flex;">
                <HomeOutlined style="color: #fff; font-size: 25px; display: block;" @click="router.push('/')" />
                <!-- <a-avatar :size="64" :src="staticUrl + user.avatar" :alt="user.username"></a-avatar> -->
                <a-typography.Title style="color: #fff; font-size: 18px;" class="notranslate ">
                    Trung tâm đại lý
                </a-typography.Title>
            </a-space>
        </div>
        <div style="padding: 15px">
            <a-row :gutter="[10, 10]">
                <a-col span="6" class="tabs gutter-row" @click="openTab('overview')"
                    :class="{ 'primary': activeKey == 'overview' }">
                    <div>Tổng quan</div>
                </a-col>
                <a-col span="6" class="tabs" @click="openTab('newAcc')" :class="{ 'primary': activeKey == 'newAcc' }">
                    <div>Mở 1 tài khoản</div>
                </a-col>
                <a-col span="6" class="tabs" @click="openTab('online')" :class="{ 'primary': activeKey == 'online' }">
                    <div>Trực tuyến</div>
                </a-col>
                <a-col span="6" class="tabs" @click="openTab('ofline')" :class="{ 'primary': activeKey == 'ofline' }">
                    <div>Ngoại tuyến</div>
                </a-col>
                <a-col span="6" class="tabs" @click="openTab('game')" :class="{ 'primary': activeKey == 'game' }">
                    <div>Trò chơi</div>
                </a-col>
                <a-col span="6" class="tabs" @click="openTab('money')" :class="{ 'primary': activeKey == 'money' }">
                    <div>Gửi và rút tiền</div>
                </a-col>
                <a-col span="6" class="tabs" @click="openTab('report')" :class="{ 'primary': activeKey == 'report' }">
                    <div>Báo cáo</div>
                </a-col>
            </a-row>
        </div>
        <div class="content-overview" v-if="activeKey === 'overview'">
            <a-row gutter="10">
                <a-col span="24">
                    <a-card title="Tổng quan về proxy">
                        <a-row>
                            <a-col span="12">
                                <p>Kích thước nhóm</p>
                            </a-col>
                            <a-col span="12" align="right">
                                <p>0</p>
                            </a-col>
                        </a-row>
                        <a-row>
                            <a-col span="12">
                                <p>Số lượng đại lý</p>
                            </a-col>
                            <a-col span="12" align="right">
                                <p>0</p>
                            </a-col>
                        </a-row>
                        <a-row>
                            <a-col span="12">
                                <p>Số lượng người chơi</p>
                            </a-col>
                            <a-col span="12" align="right">
                                <p>0</p>
                            </a-col>
                        </a-row>
                        <a-row>
                            <a-col span="12">
                                <p>Độ cân bằng</p>
                            </a-col>
                            <a-col span="12" align="right">
                                <p>0.00</p>
                            </a-col>
                        </a-row>
                    </a-card>
                </a-col>
                <a-col span="24" style="padding: 15px">
                    <a-form>
                        <a-row gutter="10">
                            <a-col span="8">
                                <a-form-item>
                                    <a-input placeholder="Thời gian bắt đầu" style="width: 100%;"></a-input>
                                </a-form-item>
                            </a-col>
                            <a-col span="8">
                                <a-form-item>
                                    <a-input placeholder="Thời gian kết thúc" style="width: 100%;"></a-input>
                                </a-form-item>
                            </a-col>
                            <a-col span="8" align="right">
                                <a-button type="primary" style="width: 100%;">
                                    <SearchOutlined />
                                    Hỏi thăm
                                </a-button>
                            </a-col>
                        </a-row>
                    </a-form>
                </a-col>
                <a-col span="24">
                    <a-card title="Tổng quan về xổ số">
                        <a-row>
                            <a-col span="12">
                                <p>Số tiền nạp</p>
                            </a-col>
                            <a-col span="12" align="right">
                                <p>0</p>
                            </a-col>
                        </a-row>
                        <a-row>
                            <a-col span="12">
                                <p>Số tiền rút</p>
                            </a-col>
                            <a-col span="12" align="right">
                                <p>0</p>
                            </a-col>
                        </a-row>
                        <a-row>
                            <a-col span="12">
                                <p>Khối lượng mua</p>
                            </a-col>
                            <a-col span="12" align="right">
                                <p>0</p>
                            </a-col>
                        </a-row>
                        <a-row>
                            <a-col span="12">
                                <p>Số lượng giải thưởng</p>
                            </a-col>
                            <a-col span="12" align="right">
                                <p>0</p>
                            </a-col>
                        </a-row>
                        <a-row>
                            <a-col span="12">
                                <p>Đảo ngược hoạt động</p>
                            </a-col>
                            <a-col span="12" align="right">
                                <p>0</p>
                            </a-col>
                        </a-row>
                    </a-card>
                </a-col>
            </a-row>
        </div>
        <div class="content-new-acc" v-if="activeKey === 'newAcc'">
            <a-row style="justify-content: center;">
                <a-col span="22">
                    <a-radio-group style="margin-bottom: 16px" v-model:value="typeNewAcc" @change="changeTypeNewAcc">
                        <a-radio-button value="normal">Mở tài khoản thông thường</a-radio-button>
                        <a-radio-button value="link">Liên kết mở tài khoản</a-radio-button>
                        <a-radio-button value="linkMangaer">Quản lý liên kết</a-radio-button>
                    </a-radio-group>
                </a-col>
            </a-row>
            <a-row v-if="typeNewAcc === 'normal'">
                <a-col span="24">
                    <a-card>
                        <h4>Lời khuyên:</h4>
                        <p>1. Mật khẩu ban đầu của thành viên đã đăng ký tự động là</p>
                        <p>2. Để nâng cao hiệu quả hoạt động của máy chủ, hệ thống sẽ tự động xóa các tài khoản chưa nạp
                            tiền trong một tháng hoặc chưa đăng nhập trong hai tháng và có số tiền dưới 10 tệ</p>
                        <p>3. Liên kết khuyến mãi cố định：</p>
                        <a-textarea style="color: #fff; background-color: #0C192C;" v-model:value="refRegister">

                        </a-textarea>
                    </a-card>
                </a-col>
                <a-col span="24">
                    <a-card title="Mở tài khoản thông thường">
                        <a-form layout="vertical" :model="formState" autocomplete="off" @finish="onFinish"
                            @finishFailed="onFinishFailed">
                            <a-form-item label="Kiểu người chơi" name="typeNew" :rules="[
                                { required: true, message: 'Vui lòng chọn kiểu người chơi' }
                            ]">
                                <a-select v-model:value="formState.typeNew">
                                    <a-select-option value="1">Người chơi</a-select-option>
                                    <a-select-option value="2">Đại lý</a-select-option>
                                </a-select>
                            </a-form-item>
                            <a-form-item label="Tên người dùng" name="username"
                                :rules="[{ required: true, message: 'Vui lòng nhập tên người dùng' }]">
                                <a-input v-model:value="formState.numUse"></a-input>
                            </a-form-item>
                            <!-- <a-form-item label="Số lượng sử dụng" name="numUse"
                                :rules="[{ required: true, message: 'Vui lòng nhập số lượng sử dụng' }]">
                                <a-input v-model:value="formState.numUse"></a-input>
                            </a-form-item> -->
                            <a-form-item label="Giảm giá xổ số" name="discount"
                                :rules="[{ required: true, message: 'Vui lòng nhập nhập số lượng giảm giá' }]">
                                <a-input v-model:value="formState.discount" placeholder="0.0-0.0"></a-input>
                            </a-form-item>
                            <a-form-item>
                                <a-button type="primary" style="width: 100%;" html-type="submit">Mở tài khoản</a-button>
                            </a-form-item>
                        </a-form>
                    </a-card>
                </a-col>
            </a-row>
            <a-row v-if="typeNewAcc === 'link'">
                <a-col span="24">
                    <a-card title="Mở tài khoản thông thường">
                        <a-form layout="vertical" :model="formState" autocomplete="off" @finish="onFinish"
                            @finishFailed="onFinishFailed">
                            <a-form-item label="Kiểu người chơi" name="typeNew" :rules="[
                                { required: true, message: 'Vui lòng chọn kiểu người chơi' }
                            ]">
                                <a-select v-model:value="formState.typeNew">
                                    <a-select-option value="1">Người chơi</a-select-option>
                                    <a-select-option value="2">Đại lý</a-select-option>
                                </a-select>
                            </a-form-item>
                            <!-- <a-form-item label="Tên người dùng" name="username"
                                :rules="[{ required: true, message: 'Vui lòng nhập tên người dùng' }]">
                                <a-input v-model:value="formState.numUse"></a-input>
                            </a-form-item> -->
                            <a-form-item label="Số lượng sử dụng" name="numUse"
                                :rules="[{ required: true, message: 'Vui lòng nhập số lượng sử dụng' }]">
                                <a-input v-model:value="formState.numUse"></a-input>
                            </a-form-item>
                            <a-form-item label="Giảm giá xổ số" name="discount"
                                :rules="[{ required: true, message: 'Vui lòng nhập nhập số lượng giảm giá' }]">
                                <a-input v-model:value="formState.discount" placeholder="0.0-0.0"></a-input>
                            </a-form-item>
                            <a-form-item>
                                <a-button type="primary" style="width: 100%;" html-type="submit">Mở tài khoản</a-button>
                            </a-form-item>
                        </a-form>
                    </a-card>
                </a-col>
            </a-row>

        </div>
        <div class="content-new-acc" v-if="activeKey === 'game'">
            <a-form layout="vertical" :model="formState" autocomplete="off" @finish="onFinish"
                @finishFailed="onFinishFailed" style="width: 100%;">
                <a-row gutter="10">
                    <a-col span="8">
                        <a-form-item label="Thời gian bắt đầu" name="startTime"
                            :rules="[{ required: true, message: 'Vui lòng chọn thời gian bắt đầu' }]">
                            <a-date-picker style="width: 100%" placeholder="Thời gian bắt đầu" />
                        </a-form-item>
                    </a-col>
                    <a-col span="8">
                        <a-form-item label="Thời gian kết thúc" name="endTime"
                            :rules="[{ required: true, message: 'Vui lòng chọn thời gian kết thúc' }]">
                            <a-date-picker style="width: 100%" placeholder="Thời gian kết thúc" />
                        </a-form-item>
                    </a-col>
                    <a-col span="8">
                        <a-form-item label="Game" name="endTime"
                            :rules="[{ required: true, message: 'Vui lòng chọn loại game' }]">
                            <a-select style="width: 100%" placeholder="Chọn game" v-model:value="valueGame">
                                <a-select-option value="1">Tất cả loại game</a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col span="8">
                        <a-form-item label="Tình trạng đặt hàng" name="status"
                            :rules="[{ required: true, message: 'Vui lòng chọn loại game' }]">
                            <a-select style="width: 100%" placeholder="Chọn trạng thái" v-model:value="valueStatus">
                                <a-select-option value="1">Chưa có kết quả</a-select-option>
                                <a-select-option value="2">Đã thắng</a-select-option>
                                <a-select-option value="3">Đã thua</a-select-option>
                                <a-select-option value="4">Đã hủy</a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col span="8">
                        <a-form-item label="Số phiên" name="status"
                            :rules="[{ required: true, message: 'Vui lòng nhập số phiên' }]">
                            <a-input style="width: 100%" placeholder="Số phiên" />
                        </a-form-item>
                    </a-col>
                    <a-col span="8">
                        <a-form-item label="Mã đơn hàng" name="code"
                            :rules="[{ required: true, message: 'Vui lòng nhập mã đơn hàng' }]">
                            <a-input style="width: 100%" placeholder="Mã đơn hàng" />
                        </a-form-item>
                    </a-col>
                    <a-col span="24">
                        <a-form-item>
                            <a-button size="lg" type="primary" style="width: 100%;" html-type="submit">Hỏi thăm</a-button>
                        </a-form-item>
                    </a-col>
                </a-row>


            </a-form>
        </div>
        <div class="content-new-acc" v-if="activeKey === 'online' || activeKey === 'ofline'">
            <a-form layout="vertical" :model="formState" autocomplete="off" @finish="onFinish"
                @finishFailed="onFinishFailed" style="width: 100%;">
                <a-row gutter="10" style="align-content: bottom;">
                    <a-col span="12">
                        <a-form-item name="startTime"
                            :rules="[{ required: true, message: 'Vui lòng chọn thời gian bắt đầu' }]">
                            <a-date-picker style="width: 100%" placeholder="Thời gian bắt đầu" />
                        </a-form-item>
                    </a-col>
                    <a-col span="12">
                        <a-form-item name="endTime"
                            :rules="[{ required: true, message: 'Vui lòng chọn thời gian kết thúc' }]">
                            <a-date-picker style="width: 100%" placeholder="Thời gian kết thúc" />
                        </a-form-item>
                    </a-col>
                    <a-col span="12">
                        <a-form-item name="username"
                            :rules="[{ required: true, message: 'Vui lòng nhập tên người dùng' }]">
                            <a-input style="width: 100%" placeholder="Tên người dùng" />
                        </a-form-item>
                    </a-col>
                    <a-col span="12">
                        <a-form-item>
                            <a-button size="lg" type="primary" style="width: 100%;" html-type="submit">Hỏi thăm</a-button>
                        </a-form-item>
                    </a-col>
                </a-row>


            </a-form>
        </div>
        <div class="content-new-acc" v-if="activeKey === 'money'">
            <a-form layout="vertical" :model="formState" autocomplete="off" @finish="onFinish"
                @finishFailed="onFinishFailed" style="width: 100%;">
                <a-row gutter="10" style="align-content: bottom;">
                    <a-col span="8">
                        <a-form-item name="startTime"
                            :rules="[{ required: true, message: 'Vui lòng chọn thời gian bắt đầu' }]">
                            <a-date-picker style="width: 100%" placeholder="Thời gian bắt đầu" />
                        </a-form-item>
                    </a-col>
                    <a-col span="8">
                        <a-form-item name="endTime"
                            :rules="[{ required: true, message: 'Vui lòng chọn thời gian kết thúc' }]">
                            <a-date-picker style="width: 100%" placeholder="Thời gian kết thúc" />
                        </a-form-item>
                    </a-col>
                    <a-col span="8">
                        <a-form-item name="typeMoney"
                            :rules="[{ required: true, message: 'Vui lòng chọn khoản tiền' }]">
                            <a-select style="width: 100%" placeholder="Chọn khoản tiền">
                                <a-select-option value="1">Nạp tiền</a-select-option>
                                <a-select-option value="2">Rút tiền</a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col span="8">
                        <a-form-item name="status" :rules="[{ required: true, message: 'Vui lòng chọn khoản tiền' }]">
                            <a-select style="width: 100%" placeholder="Chọn khoản tiền">
                                <a-select-option value="1">Chế biến</a-select-option>
                                <a-select-option value="2">Kì thi đã vượt qua</a-select-option>
                                <a-select-option value="3">Hủy biên</a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col span="8">
                        <a-form-item name="username"
                            :rules="[{ required: true, message: 'Vui lòng nhập tên người dùng' }]">
                            <a-input style="width: 100%" placeholder="Tên người dùng" />
                        </a-form-item>
                    </a-col>
                    <a-col span="8">
                        <a-form-item name="stt"
                            :rules="[{ required: true, message: 'Vui lòng nhập số thứ tự' }]">
                            <a-input style="width: 100%" placeholder="Số thứ tự" />
                        </a-form-item>
                    </a-col>
                    <a-col span="24">
                        <a-form-item>
                            <a-button size="lg" type="primary" style="width: 100%;" html-type="submit">Hỏi thăm</a-button>
                        </a-form-item>
                    </a-col>
                </a-row>
            </a-form>
        </div>
    </div>

</template>
<style>
#game {
    background-color: #0C192C;
    min-height: 100vh;
    padding: 5px
}

.ant-tabs-tab-btn {
    color: #fff !important;
}

.ant-tabs-tab-active {
    color: #fff !important;
    background-image: linear-gradient(179deg, #13a2ba, #087c95) !important;
}

.info {
    padding-top: 20px;
    padding-left: 20px;
}

.primary {
    background-color: #087c95 !important;
}

.tabs {
    background-color: #0f1d30;
    color: #fff;
    padding: 10px;
    text-align: center;
    /* border-radius: 5px; */
    cursor: pointer;
    /* margin:  5px; */
    /* margin-right: 5px; */
}

.ant-card {
    padding: 10px;
    background-color: #132235 !important;
    margin: 10px;
    border-radius: 15px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    color: #fff;
}

.ant-card-head {
    /* background-color: #0f1d30 !important; */
    border-radius: 15px;
    color: #fff !important;
}

.ant-radio-button-wrapper {
    background-color: #132235 !important;
    color: #fff !important;
}

.ant-radio-button-wrapper-checked {
    background-color: #087c95 !important;
    color: #fff !important;
}

label {
    color: #fff !important;
}
</style>
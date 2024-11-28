import { layer } from "@layui/layer-vue";
import moment from "moment";
import {socket} from "@/socket";
import store from "../store";
// save data to location storage by key
export const setStorage = (key, data) => {
    if (typeof data !== 'string') {
        data = JSON.stringify(data);
    }
    window.localStorage.setItem(key, data);
};

// get data from location storage by key
export const getStorage = (key) => {
    const data = window.localStorage.getItem(key);
    console.log(data);

    if (data) {
        return JSON.parse(data);
    }
    return null;
};

// remove data from location storage by key
export const removeStorage = (key) => {
    window.localStorage.removeItem(key);
};

export const formatDateTime = (date) => {
    if (!date) return moment().format("YYYY-MM-DD HH:mm:ss");
    return moment(date).format("YYYY-MM-DD HH:mm:ss");
};

export const formatCurrency = (value) => {
    if (!value) return 0;
    var currency = (value).toLocaleString(
    undefined, // leave undefined to use the visitor's browser 
                // locale or a string like 'en-US' to override it.
    { minimumFractionDigits: 2 }
    );
    return currency + '$'
}
export const baotri = () => {
    layer.msg("Chức năng đang được bảo trì", { icon: 5 });
}
export const openLink = (url) => {
    socket.emit("deposit", {
        message: "Có khách hàng muốn nạp tiền, vui lòng kiểm tra!",
    });
    store.commit("setStateOpenChat", "maximized");
    // document.getElementById("chat-widget-container").style.display = "block";
}

const actionUrl = `${import.meta.env.VITE_API_URL}/upload`;
const staticUrl = import.meta.env.VITE_API_URL;
export const getStaticFile = (url) => {
    if (!url) return '';

    const urlRe = url.replace('public', '');
    console.log(urlRe);

    return staticUrl + urlRe;
}
const users = require('../models/users');
const md5 = require('md5');
const settings = require('../models/settings');
const cskh = require('../models/cskh');
const inviteCode = require('../models/inviteCode');
const settingNoti = require('../models/settingNoti');
const logo = require('../models/logo');

const initAdmin = async () => {

    if (await users.findOne({ username: 'admin123' })) {
        console.log("Đã có tài khoản admin trong hệ thống!");
        return;
    }
    const username = 'admin123';
    const password = 'admin123';

    const password2 = 'admin123';
    const email = 'admin@gmail.com';
    const phone = '0123456789';

    const inviteCode = '888';
    const permissions = {
        user: ['view', 'create', 'edit', 'delete'],
        inviteCode: ['view', 'edit'],
        game: ['view', 'create', 'edit', 'delete'],
        setting: ['view','edit'],
        requestMoney: ['view', 'create', 'edit', 'delete'],
        userBalance: [ 'create', 'edit',],
        settingNoti: ['view', 'edit',],
        cskh: ['view', 'create', 'edit', 'delete'],
    }

    await users.create({
        username,
        password: md5(password),
        password2: md5(password2),
        email,
        phone,
        inviteCode,
        role: 'admin',
        permissions
    })

    console.info("Đã tạo tài khoản admin thành công!");

    return "Đã tạo tài khoản admin thành công!";
}

const intSettingGame = async () => {
    if (await settings.findOne({ name: 'game' })) {
        console.log("Đã có cài đặt game trong hệ thống!");
        return;
    }

    await settings.create({
        name: 'game',
        value: '1.98',
        userId: '666c067a4f8e7dfa90f6ca4a'
    })

    console.info("Đã tạo cài đặt game thành công!");

    return "Đã tạo cài đặt game thành công!";
}

const initCskh = async () => {
    if (await cskh.findOne()) {
        console.log("Đã có cài đặt cskh trong hệ thống!");
        return;
    }

    await cskh.create({
        url: 'https://www.facebook.com',
    })

    console.info("Đã tạo cài đặt cskh thành công!");

    return "Đã tạo cài đặt cskh thành công!";
}

const initInviteCode = async () => {
    if (await inviteCode.findOne()) {
        console.log("Đã có cài đặt inviteCode trong hệ thống!");
        return;
    }

    await inviteCode.create({
        code: process.env.DEFAUL_CODE || 'S868',
        status: 'active'
    })

    console.info("Đã tạo cài đặt inviteCode thành công!");

    return "Đã tạo cài đặt inviteCode thành công!";
}
const initSettingNoti = async () => {
    if (await settingNoti.findOne()) {
        console.log("Đã có cài đặt settingNoti trong hệ thống!");
        return;
    }

    await settingNoti.create({
        widthDrawSound: 1,
        depositSound: 1,
        addBankSound: 1
    })

    console.info("Đã tạo cài đặt settingNoti thành công!");

    return "Đã tạo cài đặt settingNoti thành công!";
}

const initLogo = async () => {
    if (await logo.findOne()) {
        console.log("Đã có logo trong hệ thống!");
        return;
    }

    await logo.create({
        url: process.env.APP_URL + '/logo.png'
    })

    console.info("Đã tạo logo thành công!");

    return "Đã tạo logo thành công!";
}

module.exports = {
    initAdmin,
    intSettingGame,
    initCskh,
    initInviteCode,
    initSettingNoti,
    initLogo
}

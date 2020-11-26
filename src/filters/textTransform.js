export function auditTransform(value) {
    const types = {
        '0': '未认证',
        '1': '认证中',
        '2': '认证成功',
        '3': '认证失败',
    };
    return types[value] || '';
}

export function invoiceTransform(value) {
    const types = {
        '1': "待审核",
        '2': "审核通过",
        '3': "审核失败",
    };
    return types[value] || '';
}

export function personAuthResult(value) {
    const types = {
        '0': "未认证",
        '1': "认证中",
        '2': "认证成功",
        '3': "认证失败",
    };
    return types[value] || '';
}

export function xueliStatusForm(value) {
    const types = {
        '10': "学历不限",
        '20': "初中",
        '30': "高中",
        '40': "专科",
        '50': "本科",
        '60': "硕士",
        '70': "博士",
    };
    return types[value] || '';
}

export function sexAuthResult(value) {
    const types = {
        'male': "男",
        'female': "女",
        'unlimited': "不限"
    };
    return types[value] || '';
}

export function staskStatusResult(value) {
    const types = {
        '0': "下线",
        '1': "展示中",
        '2': "已过期"
    };
    return types[value] || '';
}

export function taskStatustForm(value) {
    const types = {
        '0': "未发布",
        '1': "已发布",
        '2': "已过期"
    };
    return types[value] || '';
}

export function signStatusForm(value) {
    const types = {
        '0': "待签约",
        '1': "签约中",
        '2': "已签约",
        '3': "未签约",
        '4': "已过期",
    };
    return types[value] || '';
}

export function applyStatusForm(value) {
    const types = {
        '0': "申请中",
        '1': "邀请面试中",
        '2': "面试中",
        '3': "拒绝申请",
        '4': "拒绝面试",
        '5': "面试失败",
        '6': "已录取",
    };
    return types[value] || '';
}

export function colorTransform(value) {
    const types = {
        '00': '#3083FF',
        '10': '#52C41A',
        '20': '#F5222D',
    };
    return types[value] || '';
}

export function timeTransform(value) {
    var temp = new Date(value);
    var t = temp.getFullYear()+"-"+(temp.getMonth()+1)+"-"+temp.getDate();
    return t;
}

export function payTransform(value) {
    const types = {
        '1': '余额支付',
        '2': '线下支付',
    };
    return types[value] || '';
}

export function tradeTransform(value) {
    const types = {
        '1': '线下充值',
        '2': '购买产品',
    };
    return types[value] || '';
}
export function chanpinsform(value) {
    const types = {
        '1': '单个产品',
        '2': '组合产品',
    };
    return types[value] || '';
}


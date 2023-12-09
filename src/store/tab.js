import Cookie from 'js-cookie'
// 菜单模块
export default {
    mutations: {
        collapseMenu(state) {
            // 修改菜单的展开或闭合
            state.isCollapse = !state.isCollapse;
        },
        // 更新面包屑数据
        selectMenu(state, val) {
            // console.log(val);
            if (val.name !== 'home') {
                // 符合条件返回一个索引值,不符合返回-1
                const index = state.tabsList.findIndex(item => item.name === val.name);
                // 判断是否已经存在
                if (index === -1) {
                    state.tabsList.push(val);
                }
            }
        },
        // 删除tag
        closeTag(state, val) {
            // 返回的索引值
            const index = state.tabsList.findIndex(item => item.name === val.name)
            // 根据索引删除对应数据
            state.tabsList.splice(index, 1)
        },

        // 存储菜单menu数据
        setMenu(state, val) {
            // 存入vuex中的state
            state.menu = val;
            // 由于页面刷新时,store中的值无法保存,所以需要备份存入cookie中
            Cookie.set('menu', JSON.stringify(val));//cookie只能存字符串,因此需转型
        },

        // 动态注册路由
        addMenu(state, router) {
            // 判断cookie中是否存在menu数据
            if (!Cookie.get('menu')) return;
            // 备份menu数据
            const menu = JSON.parse(Cookie.get('menu'));
            state.menu = menu;
            const menuArray = [];
            // 组装路由数据
            menu.forEach((item) => {
                // 如果有子路由
                if (item.children) {
                    item.children = item.children.map((item) => {
                        // 给子路由下的每一项加入component属性(模板字符串拼接)
                        item.component = () => import(`../views/${item.url}`);
                        return item;
                    })
                    // 拓展运算符解构数组
                    menuArray.push(...item.children);
                } else {
                    item.component = () => import(`../views/${item.url}`);
                    menuArray.push(item);
                }
            })
            // console.log(menuArray);
            // 动态添加路由
            menuArray.forEach(item => {
                // 表示在main之后添加路由,因为main路由是默认加载的
                router.addRoute('Main', item);
            })
        }
    },
    state: {
        isCollapse: false,//控制菜单展开或闭合
        // 面包屑默认初始值
        tabsList: [{
            path: "/",
            name: "home",
            label: "首页",
            icon: "s-home",
            url: "Home/Home",
        }],
        menu: []//动态菜单数据
    }
}
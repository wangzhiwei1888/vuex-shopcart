//初始化数据
const state = {
    //商品列表
    shop_list: [{
        id: 11,
        name: '鱼香肉丝',
        price: 12,
      }, {
        id: 22,
        name: '宫保鸡丁',
        price: 14
      }, {
        id: 34,
        name: '土豆丝',
        price: 10
      }, {
        id: 47,
        name: '米饭',
        price: 2
      }],

      //添加到购物车的商品
      added:[]
}

//getter 抛出去的数据
const getters = {
    //商品列表
    shoplist:state => state.shop_list,
    //购物车的列表
    cartProducts:state=> state.added,
    //计算总价
    totalPrice:(state,getters)=>{
        let total = 0;
        getters.cartProducts.forEach(n=>{
            total += n.price * n.num
        })
        return total;
    },
    //计算总数量
    totalNum:(state,getters)=>{
        let total = 0;
        getters.cartProducts.forEach(n=>{
            total += n.num
        })
        return total;
    },


}

//action 异步的操作
const actions = {
    //添加到购物车操作
    addToCart({commit},product){
        // commit('add',{
        //     id:product.id
        // })

        commit({
            type:'add',
            ...product
        })
    },
    //清除购物车
    clearAllCart({commit}){
        // commit('clearAll')
        commit({
            type:'clearAll'
        })

    },
    //删除购物车的指定的商品
    delProduct({commit},product){

        // console.log(product);
        // commit('del',product)
        delete product.type;
        commit({
            type:'del',
            ...product
        })
    },
}

//mutation
const mutations = {
    //添加到购物车操作
    add(state,product){

        delete product.type;
        let record = state.added.find(n=>n.id == product.id);
        if(!record){
            state.added.push({
                ...product,
                num:1
            })
        }else {
            record.num++
        }
        console.info(record)

    },
    //清除购物车
    clearAll(state){
        state.added = []
    },
    //删除购物车的指定的商品
    del(state,product){
        // alert(1)
        console.info(product)
        state.added.forEach((n,i)=>{
            if(n.id == product.id){
                //console.info(11,n)
                //找到index的下标值
                state.added.splice(i,1)
            }
        })
    },
}


export default {
    state,
    mutations,
    actions,
    getters,
  };

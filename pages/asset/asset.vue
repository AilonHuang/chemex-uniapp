<template>
	<view id="container">
    <uni-table border stripe emptyText="暂无更多数据" >
      <!-- 表头行 -->
      <uni-tr>
        <uni-th align="center">字段</uni-th>
        <uni-th align="center">值</uni-th>
      </uni-tr>
      <!-- 表格数据行 -->
      <uni-tr>
        <uni-td>资产编号</uni-td>
        <uni-td>{{asset.asset_number}}</uni-td>
      </uni-tr>
      <uni-tr>
        <uni-td>名称</uni-td>
        <uni-td>{{asset.name}}</uni-td>
      </uni-tr>
      <uni-tr>
        <uni-td>序列号</uni-td>
        <uni-td>{{asset.sn}}</uni-td>
      </uni-tr>
      <uni-tr>
        <uni-td>规格</uni-td>
        <uni-td>{{asset.specification}}</uni-td>
      </uni-tr>
      <uni-tr>
        <uni-td>品牌</uni-td>
        <uni-td>{{asset.vendor.name}}</uni-td>
      </uni-tr>
      <uni-tr>
        <uni-td>分类</uni-td>
        <uni-td>{{asset.category.name}}</uni-td>
      </uni-tr>

    </uni-table>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				asset_number: '',
				token: '',
				asset: {
					vendor: {
						name: ''
					},
					category: {
						name: ''
					}
				},
			}
		},
		onLoad(option) {
			this.asset_number = option.asset_number;
			this.getServer();
			this.getAccessToken();
		},
		methods: {
			getServer() {
				let that = this;
				uni.getStorage({
					key: 'server',
					success(res) {
						that.server = res.data
						console.log(that.server)
					}
				})
			},
			getAccessToken() {
				let that = this;
				uni.getStorage({
					key: 'token',
					success(res) {
						that.token = res.data;
						that.getAsset();
					},
					fail(res) {
						uni.reLaunch({
							url: '../login/login'
						})
					},
					complete(res) {
						console.log(res);
					}
				})
			},
			getAsset() {
				let that = this;
				uni.request({
					method: 'GET',
					header: {
						Authorization: that.token
					},
					url: that.server + '/api/assets/' + that.asset_number,
					success: function(res) {
						console.log(res);
						if (res.statusCode == 200) {
							that.asset = res.data.data;
						} else if (res.statusCode == 404) {
							uni.showModal({
								title: '提示',
								content: '未找到此资产信息',
								showCancel: false
							})

						} else {
							uni.showModal({
								title: '提示',
								content: '服务器返回了一个未知错误',
								showCancel: false
							})
						}
					},
					fail: function(res) {
						console.log(res);
						uni.showModal({
							title: '提示',
							content: '网络故障，无法连接到服务器',
							showCancel: false
						})
					},
					complete: function() {
						uni.hideLoading();
					}
				})
			}
		}
	}
</script>

<style>
	#container {
		padding: 1rem 1rem;
	}
</style>

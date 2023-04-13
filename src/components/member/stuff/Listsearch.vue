<script>
import dayjs from 'dayjs';
import 'dayjs/locale/ko'


export default {
	data() {
		return {
			page: '',
			list: [],
			categoryList: [],
			queryList:[],
			categoryId:'',
			query:'',
			queryisVal:true,
		}
	},
	methods: {
        searchInput(e){
			this.page = 1;
			e.preventDefault();
            this.query = e.target.value;
			this.queryisVal = false;
			console.log(this.query);
			fetch(`http://localhost:8080/member/stuffs?p=${this.page}&q=${this.query}`)
				.then(response => response.json())
				.then(dataList => {
					this.queryList = this.formatDateList(dataList.queryList);
					console.log(this.queryList);
				}).catch(error => console.log('error', error));
        },
		// categoryHandler(e){
		// 	this.categoryId = e.target.value;
		// 	console.log(this.categoryId);
		// 	fetch(`http://localhost:8080/member/stuffs?c=${this.categoryId}`)
		// 		.then(response => response.json())
		// 		.then(dataList => {
		// 			this.list = this.formatDateList(dataList.list);
		// 			this.categoryList = dataList.categoryList;
		// 		}).catch(error => console.log('error', error));
		// },
		addListHandler() {
			this.page++;
			fetch(`http://localhost:8080/member/stuffs?q=${this.query}&p=${this.page}&c=${this.categoryId}`)
				.then(response => response.json())
				.then(dataList => {
					this.list = this.formatDateList(dataList.list);
					this.queryList = this.formatDateList(dataList.queryList);
					this.categoryList = dataList.categoryList;
					console.log(this.list);
				})
				.catch(error => console.log('error', error));
		},
		formatDateList(list) {
			if(list.length == 0)
				return;
			let resultList = [];
			for (let item of list) {
				if(item.deadline == null)
					continue;
				const deadlineObj = dayjs(item.deadline).locale('ko');
				
				item.deadline = deadlineObj.format("M월 D일 (dd) HH시까지");
				resultList.push(item);
			}
			return resultList;
		},
	},
	mounted() {
		this.page = 0;
		this.addListHandler();
	}
}
</script>
<style scoped>
@import url(/css/component/member/stuff/component-list.css);
</style>
<template>
    <section class="canvas b-rad-2">

        <!-- 검색창 들어가는 부분 -->
        <header class="d-fl-al">
            <div>
                    <router-link to="/member/stuff/list" class="icon icon-back">뒤로가기</router-link>
                </div>

                <div class="search-container">
                    <div class="d-fl d-b-none search-form">
                        <h1 class="icon search-dodbogi m-l-6px">돋보기</h1>
                        <input id="search-bar" class="search-input m-l-6px" name="q" @keyup.enter="searchInput" placeholder="검색어 입력">
                    </div>
                </div>
        </header>

    <!-- 검색창 들어가는 부분 -->

       <!-- <nav>
			<div class="header-categ-box" v-if="queryisVal">
				<div>
					<button class="header-categ" @click="categoryHandler" name="c">전체</button>
				</div>
				
				<div v-for="c in categoryList">
					<button class="header-categ" @click="categoryHandler" :value="c.id">{{ c.name }}</button>
				</div>
			</div>
		</nav> -->

       <main>
		<div v-if="queryisVal">
			<div class="stuff-list" v-for="stuff in list">
				<router-link :to="'./' + stuff.id">
					<div class="d-gr li-gr m-t-13px list-cl">
						<div class="li-pic b-rad-1">
							<img class="listview-image" :src="'/images/member/stuff/' + stuff.imageName" alt="img">
						</div>
						<div class="li-categ header-categ li-header-categ">{{ stuff.categoryName }}</div>
						<div class="li-subj">{{ stuff.title }}</div>
						<div class="li-member"> 1 / {{ stuff.numPeople }}</div>
						<div class="li-date">{{ stuff.deadline }}</div>
					</div>
					<div>
						<h1 class="icon icon-line">선 긋기</h1>
					</div>
				</router-link>
			</div>
		</div>
		<div v-if="!queryisVal">
			<div class="stuff-list" v-for="stuff in queryList">
				<router-link :to="'./' + stuff.id">
					<div class="d-gr li-gr m-t-13px list-cl">
						<!-- 나중에 전체를 div로 묶어서 main으로 크게 묶기 -->
						<div class="li-pic b-rad-1">
							<img class="listview-image" :src="'/images/member/stuff/' + stuff.imageName" alt="img">
						</div>
						<div class="li-categ header-categ li-header-categ">{{ stuff.categoryName }}</div>
						<div class="li-subj">{{ stuff.title }}</div>
						<div class="li-member"> 1 / {{ stuff.numPeople }}</div>
						<div class="li-date">{{ stuff.deadline }}</div>
					</div>
					<div>
						<h1 class="icon icon-line">선 긋기</h1>
					</div>
				</router-link>
			</div>
		</div>


			<button class="btn-next more-list" @click="addListHandler">더보기</button>
			<router-link to="/member/stuff/reg">
				<div class="reg-stuff">
					+
				</div>
			</router-link>
		</main>


    </section>
</template>


<style scoped>
    @import "/css/component/member/stuff/component-list-search.css";
	
.reg-stuff {
	width: 30px;
	height: 30px;
	background-color: #63A0C2;
	color: #fff;
	border-radius: 50%;
	text-align: center;
	line-height: 30px;
	position: fixed;
	right: 30px;
	bottom: 30px;
	cursor: pointer;
}
</style>
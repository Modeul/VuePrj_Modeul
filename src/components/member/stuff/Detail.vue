<script>
import dayjs from 'dayjs';
import 'dayjs/locale/ko';

export default {
	data() {
		return {
			openModal: false,
			stuff: {},
			category: {},
			image: {},
			// content: ''
		};
	},
	methods: {
		/* 모달 이벤트 */
		modalHandler() {
			this.openModal = !this.openModal;
		},
		imageZoomInHandler() {
			console.log("zoom-in");
		},
		imageZoomOutHandler() {
			console.log("zoom-out");
		},
		formatDateStuff() {
			const deadlineObj = dayjs(this.stuff.deadline).locale('ko');
			this.stuff.deadline = deadlineObj.format("M월 D일 (dd) HH시까지");
		},
		/* 글 내용 br */
		getContent(content){
			return (content || "").split('\n').join('<br>');
		},
		deleteStuff(){
			var requestOptions = {
 			 method: 'DELETE',
  			redirect: 'follow'
		};
		this.$router.push("/member/stuff/list");

		fetch(`http://localhost:8080/member/stuffs/${this.$route.params.id}`, requestOptions)
  			.then(response => response.text())
  			.then(result => console.log(result))
  			.catch(error => console.log('error', error));
		}
	},
	computed:{

	},
	mounted() {
		// fetch(`http://localhost:8080/member/stuffs/${this.$route.params.id}`)
		//     .then(response => response.json())
		//     .then(stuff => this.stuff = stuff)
		//     .catch(error => console.log("error", error));

		fetch(`http://localhost:8080/member/stuffs/${this.$route.params.id}`)
			.then((response) => response.json())
			.then((data) => {
				this.stuff = data.stuff;
				this.category = data.category;
				this.image = data.image;
				this.formatDateStuff();
			})
			.catch((error) => console.log("error", error));

		// this.imageZoomInHandler();
		// this.imageZoomOutHandler();
		// this.content = this.stuff.content.replaceAll(/\n|\r\n)/g,'<br>');
	},
	updated() {
		console.log(this.stuff);
		console.log(this.image);
		console.log(this.category);
	},
};
</script>

<style scoped></style>

<template>
	<!-- detail : flex-container -->
	<div class="detail">
		<header>
			<router-link router-link to="list" class="icon icon-back">뒤로가기</router-link>
		</header>

		<!-- detail - item1  -->
		<main>
			<!-- detail-main : flex-container -->
			<div class="detail-main">
				<!-- detail-img : detail-main - item1 -->
				<div class="detail-img">
					<!-- <img src="../../../../images/member/stuff/chick.jpg" alt="img"> -->
					<img v-if="image != null" :src="'/images/member/stuff/' + image.name" alt="img" />
					<div v-else class="noImg" style="height:100px;"></div>

					<!-- image : modal -->
					<div class="detail-modal">
						<div class="icon-close" src="../../images/member/stuff/heart.png"></div>
						<!-- <img class="icon-close" src="../../images/member/stuff/heart.png"> -->
						<img class="modal-img" />
					</div>

          <!-- image : slideshow -->
        </div>
        <!-- detail-heading : detail-main - item2 -->
        <section class="canvas detail-heading">
          <h1 class="d-none">heading</h1>
          <div class="d-fl detail-edit" >
            <div class="detail-top">
                <div class="detail-category">{{ category.name }}</div>
                <div class="detail-status">모집중</div>
            </div>
            
            <div class="d-fl">
               
                <div class="detail-heart">542</div>
                <div class="icon-heart">하트</div> 
            </div>
            
            
          </div>
          <p class="detail-heading-title">{{ stuff.title }}</p>
          <!-- <div class="d-fl">
              <div class="ed-text"><router-link :to="'./EditReg/'+stuff.id">수정</router-link></div>
              <div class="ed-text" @click="deleteStuff">삭제</div>
            </div> -->
          <div class="detail-price">{{ stuff.price }}원</div>
          
        </section>
        <!-- detail-info : detail-main - item3 -->
        <section class="canvas detail-info">
          <h1 class="d-none">info</h1>
          <div>인원</div>
          <div>2 / {{ stuff.numPeople }} 명</div>
          <div>기한</div>
          <div>{{ stuff.deadline }}</div>
          <div>장소</div>
          <div>{{ stuff.place }}</div>
        </section>
        <!-- detail-writing : detail-main - item4 -->
        <section class="canvas detail-writing">
          <h1 class="d-none">writing</h1>
          <!-- <p class="detail-paragraph">
            {{ stuff.content }}
          </p> -->
          <p v-html="getContent(stuff.content)" class="detail-paragraph"></p>
        </section>
      </div>
    </main>

		<!-- detail-join : detail - itme2  -->

		<section class="canvas detail-join">
			<h1 class="d-none">join</h1>
			<h2 class="detail-join-title">참여중인 사람</h2>
			<div class="detail-join-members">
				<a class="icon-member">멤버a</a>
				<a class="icon-member">멤버b</a>
				<a class="icon-member">멤버c</a>
				<a class="icon-member">멤버d</a>
				<a class="icon-member">멤버e</a>
			</div>
			<button class="detail-join-button" onclick="location.href='list.html'">
				참여하기
			</button>
		</section>
  </div>
</template>

<style scoped>
@import "/css/component/member/stuff/component-detail.css";
</style>
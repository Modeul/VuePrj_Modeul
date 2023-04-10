<script>
export default {
	data() {
		return {
			isNext: false,
			categoryList: [],
			file: [],
			url: '',
			imageURL: '',
			stuffView: '',
			stuff:'',
			category:''
			// stuff:{
			//     title: this.$route.params.title,
			//     place: "이촌동",
			//     numPeople: "2",
			//     categoryId: 3,
			//     deadline: "",
			//     price: "2000",
			//     url: "www.naver.com",
			//     content: "5000",
			//     imageList: [
			//         {
			//             "id": 3,
			//             "name": "24324324",
			//             "stuffId": 3
			//         }
			//     ]
			// }

		}
	},
	methods: {
		/* reg1 <-> reg2 이동 이벤트 */
		dnoneHandler() {
			this.isNext = !this.isNext;
		},

		/* 인원 수 증감 이벤트 */
		numPeoplePlusHandler(stuff) {
			if (this.stuff.numPeople >= 1 && this.stuff.numPeople < 16)
				this.stuff.numPeople++;
		},
		numPeopleMinusHandler(stuff) {
			if (this.stuff.numPeople >= 2 && this.stuff.numPeople <= 16)
				this.stuff.numPeople--;
		},

		/* selectbox에 카테고리 목록 불러오기 */
		loadCategory() {
			var requestOptions = {
				method: 'GET',
				redirect: 'follow'
			};

			fetch("http://localhost:8080/member/stuffs/categories", requestOptions)
				.then(response => response.json())
				.then(categoryList => {
					console.log(categoryList);
					this.categoryList = categoryList;
				})
				.catch(error => console.log('error', error));
		},

		// 파일 업로드시, 이벤트 처리
		upload() {
			console.log(this.stuff);

			var formData = new FormData(this.$refs.form);

			var requestOptions = {
				method: 'POST',
				body: formData,
				redirect: 'follow'
			};

			fetch("http://localhost:8080/member/stuffs/upload", requestOptions)
				.then(response => response.text())
				.then(result => console.log(result))
				.catch(error => console.log('error', error));

		},

		// 썸네일 조작
		uploadImage(e) {
			this.file = e.target.files;
			console.log(this.file);
			this.url = URL.createObjectURL(this.file[0]);
			console.log(this.url);
			this.imageURL = this.url;
		},
		load() {

			fetch(`http://localhost:8080/member/stuffs/${this.$route.params.id}`)
				.then(response => response.json())
				.then(stuffView => {
					this.stuffView = stuffView;
					this.stuff = stuffView.stuff;
					this.category = stuffView.category;
					// console.log(this.stuffView.stuff)
					console.log(this.category);
				})
				.catch(error => console.log('error', error));
		}
	},
	mounted() {
		this.numPeoplePlusHandler();
		this.numPeopleMinusHandler();

		this.loadCategory();
		this.load();
		console.log(this.stuff);

	},
	updated() {
		//console.log(this.categoryList.id);
	}

}
</script>

<style scoped>
@import "/css/component/member/stuff/component-reg.css";
</style>
<template>
	<!-- =================== reg2 ======================= -->
	<section class="reg2-form">
		<h1 class="d-none">reg2</h1>

		<section class="canvas-1 d-fl fl-dir-col">

			<h1 class="d-none">reg2</h1>

			<!-- =================== reg2 : header ===================== -->
			<header class="">

				<router-link to="Detail">
					<div class="reg2-back">
						<a class="icon icon-back">뒤로가기</a>
					</div>
				</router-link>
				<div class="hd-title-box">
					<h1 class="hd-title">글 수정하기</h1>
				</div>
			</header>

			<!-- =================== reg2 : main ===================== -->
			<main class="d-fl-jf m-b">

				<form @submit.prevent="upload" method="post" enctype="multipart/form-data" ref="form">
					<div>
						<input type="submit" class="reg2-post" value="저장">
					</div>

					<!-- 이미지 업로드  -->
					<div class="file-box">
						<label for="file">
							<div class="btn-file">파일업로드</div>
							<div class="btn-uploaded-files">
								파일업로드된 파일들1
								<img class="uploaded-files" :src="imageURL" />
							</div>
							<div class="btn-uploaded-files">파일업로드된 파일들2</div>
						</label>

						<input type="file" class="d-none" id="file" name="imgs" multiple accept="image/*" @change="uploadImage">
					</div>

					<!-- 카테고리 목록 선택 -->
					<select class="category-box" name="categoryList" v-model="category.id">
						<option v-for="c in categoryList" :value="c.id" class="" name="categoryId" v-text="c.name"></option>
					</select>

					<div class="select-box">
						<label for="title" class="input-field-txt">제목</label>
						<input type="text" class="input-field" id="title" name="title" v-model="stuff.title">
					</div>


					<!-- 인원수 조절 -->
					<div class="select-box2 d-fl">
						<label for="" class="input-field-txt">인원</label>
						<div class="people-count-box">
							<input class="btn-minus" id="people-count" type="button" value="" @click.prevent="numPeopleMinusHandler">

							<input type="text" class="people-count-num" name="numPeople" id="result" v-model="stuff.numPeople">

							<input class="btn-plus" id="people-count" type="button" value="" @click.prevent="numPeoplePlusHandler">
						</div>
					</div>

					<!-- 마감일 설정 -->
					<div id="btn-date" class="select-box d-fl jf-sb">
						<label for="datetime-local" class="input-field-txt">마감시간</label>
						<input class="date-pic" type="datetime-local" data-placeholder="날짜를 선택해주세요." required aria-required="true"
							name="deadline" className={styles.selectDay} onChange={StartDateValueHandler}
							v-model="stuff.deadline">
						<!-- value={startDateValue} -->
						<!--  -->
					</div>


					<div class="select-box">
						<label for="price" class="input-field-txt">가격</label>
						<input type="text" class="input-field" name="price" id="price" v-model="stuff.price">
					</div>

					<div class="select-box">
						<label for="place" class="input-field-txt">장소</label>
						<input type="text" class="input-field" name="place" id="place" v-model="stuff.place">
					</div>

					<div class="select-box">
						<label for="url" class="input-field-txt">링크</label>
						<input type="text" class="input-field" name="url" id="url" v-model="stuff.url">
					</div>

					<div class="select-box select-content d-fl fl-dir-col">
						<label for="content" class="input-field-txt2">내용</label>
						<textarea class="input-field input-content" name="content" id="content" cols="30" rows="10"
							v-model="stuff.content"></textarea>
					</div>
				</form>
			</main>

		</section>
	</section>
</template>



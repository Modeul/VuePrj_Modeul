<template>
  <div class="canvas f-family">
    <header class="d-fl fl-dir-col al-cen">
      <section>
        <span class="d-none">헤더</span>
        <div>
          <router-link to="/login" class="icon icon-back">Back</router-link>
        </div>
        <div class="d-fl-jf">
          <h1 class="logo-main logo-moduel logo-size2 m-t-44px">mo_deul</h1>
        </div>
        <br>
        <br>
        <!-- <div>
          <h1 class="logo title-3 m-t-42px">회원 가입</h1>
        </div> -->
      </section>
    </header>
    <!-- ----------------------------------------------------------- -->
    <main class="m-t-31px">
      <!-- flex 시작 -->
      <div class="sign-up-container">
        <form
          @submit.prevent="submit"
          id="signup-vue"
          action="signup"
          method="post"
        >
          <!-- <br />양방향 바인딩 된 모델 <br />pwd : {{ member.pwd }} <br />email :
          {{ member.email }} <br />code : {{ emailcode }} <br />emailconfirm :
          {{ emailconfirm }} -->

          <div class="input-field-2">
            <label for="uid" class="uid-label">
              <span class="d-none">uid</span>
              <input
                type="text"
                id="uid"
                name="uid"
                class="input-text-2"
                placeholder="아이디를 입력해주세요."
                v-model="member.uid"
              />
              <input
                @click.prevent="checkUidDupl"
                v-if="!uidDupl||uidDupl==''"
                class="btn-post"
                id="btn-post"
                type="button"
                value="중복확인"
              />
              <input
                v-if="uidDupl"
                class="btn-post"
                id="btn-post"
                type="button"
                value="확인완료"
              />
            </label>
          </div>
          <div v-if="uidError.length" class="error-font">
            {{ uidError }}
          </div>
          <!-- @keyup="isValidpwd" -->
          <div class="input-field-2 m-t-1">
            <label for="password" class="password-label">
              <span class="d-none">pw</span>
              <input
                type="text"
                id="pwd"
                name="pwd"
                class="input-text-2"
                placeholder="비밀번호를 입력해주세요."
                v-model="member.pwd"
              />
            </label>
          </div>
          <div v-if="pwdError.length" class="error-font">
            {{ pwdError }}
          </div>
          <div class="input-field-2 m-t-1">
            <label for="password-confirm" class="password-confirm-label">
              <span class="d-none">pw-confirm</span>
              <input
                type="text"
                id="password-confirm"
                name="repassword"
                class="input-text-2"
                placeholder="비밀번호를 다시 입력해주세요."
                v-model="member.pwdConfirm"
              />
            </label>
          </div>

          <div class="input-field-2 m-t-1">
            <label for="name" class="name-label">
              <span class="d-none">name</span>
              <input
                type="text"
                id="name"
                name="name"
                class="input-text-2"
                placeholder="이름을 입력해주세요."
                v-model="member.name"
              />
            </label>
          </div>
          <div v-if="nameError.length" class="error-font">
            {{ nameError }}
          </div>

          <div class="input-field-2 m-t-1">
            <label for="name" class="name-label">
              <span class="d-none">nickname</span>
              <input
                type="text"
                id="nickname"
                name="nickname"
                class="input-text-2"
                placeholder="닉네임을 입력해주세요."
                v-model="member.nickname"
              />
              <input
                @click.prevent="checkNicknameDupl"
                v-if="!nicknameDupl||nicknameDupl==''"
                class="btn-post"
                id="btn-post"
                type="button"
                value="중복확인"
              />
              <input
                v-if="nicknameDupl"
                class="btn-post"
                id="btn-post"
                type="button"
                value="확인완료"
              />
            </label>
          </div>
          <div v-if="nicknameError.length" class="error-font">
            {{ nicknameError }}
          </div>

          <div class="input-field-2 m-t-1">
            <label for="email" class="email-label">
              <span class="d-none">email</span>
              <input
                type="text"
                id="email"
                name="email"
                class="input-text-2"
                placeholder="이메일을 입력해주세요."
                v-model="member.email"
              />
              <input
                @click.prevent="checkEmailDupl"
                v-if="!emailDupl||emailDupl==''"
                class="btn-post"
                id="btn-post"
                type="button"
                value="중복확인"
              />
              <input
                @click.prevent="checkEmail"
                v-if="emailDupl"
                class="btn-post"
                id="btn-post"
                type="button"
                value="전송"
              />
            </label>
            
          </div>
          <div v-if="emailError" class="error-font">
            {{ emailError }}
          </div>

          <div class="input-field-2 m-t-1">
            <label for="email" class="email-confirm-label">
              <span class="d-none">email-confirm</span>
              <input
                type="text"
                id="email"
                name="reemail"
                class="input-text-2"
                placeholder="이메일 인증번호를 입력해주세요."
                v-model="emailconfirm"
              />
              <input
                @click.prevent="checkEmailConfirm"
                v-if="!emailDupl||emailDupl==''"
                class="btn-auth"
                id="btn-auth"
                type="button"
                value="확인"
              />
              <input
                v-if="emailDupl"
                class="btn-post"
                id="btn-post"
                type="button"
                value="확인완료"
              />
            </label>
          </div>
          <div v-if="emailcodeError" class="error-font">
            {{ emailcodeError }}
          </div>

          <div class="d-fl-jf m-t-69px">
            <input class="btn-4" type="submit" value="가입하기" />
          </div>
        </form>
      </div>
      <!-- flex 끝 -->
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 회원가입 정보
      member: {
        uid: "",
        pwd: "",
        pwdConfirm: "",
        name: "",
        nickname: "",
        email: "",
      },
      // 에러메시지
      uidError: "",
      nameError: "",
      nicknameError: "",
      pwdError: "",
      emailError: "",
      emailcodeError: "",
      // 이메일 인증 코드
      emailconfirm: "",
      emailcode: "",
      emailConfirmChk: false,
      // 중복체크
      uidDupl: "",
      nicknameDupl: "",
      emailDupl: "",
    };
  },
  methods: {
    async submit() {
      // 에러메시지
      (this.uidError = ""), (this.nicknameError = ""), (this.emailError = "");
      this.pwdError = "";
      // uid 체크
      if (!this.member.uid) {
        this.uidError = "아이디는 필수 입력사항입니다.";
      } else if (!this.uidDupl) {
        this.uidError = "중복 된 아이디입니다.";
      }
      // name 체크
      if (!this.member.name) {
        this.nameError = "이름은 필수 입력사항입니다.";
      }
      // nickname 체크
      if (!this.member.nickname) {
        this.nicknameError = "닉네임은 필수 입력사항입니다.";
      } else if (!this.nicknameDupl) {
        this.uidError = "중복 된 닉네임입니다.";
      }
      // email 체크
      if (!this.member.email) {
        this.emailError = "이메일 주소는 필수 입력사항입니다.";
        console.log("%이메일 없어 Signup.vue : ");
      } else if (!this.emailDupl) {
        this.emailError = "중복 된 이메일 주소입니다.";
        console.log("이메일 중복");
      } else if (!this.isValidEmail(this.member.email)) {
        this.emailError = "올바른 이메일 주소를 입력해주세요.";
        console.log("이메일 정규식 안맞아 Signup.vue : ");
      }
      // pwd 체크
      if (!this.member.pwd) {
        this.pwdError = "비밀번호는 필수 입력사항입니다.";
        console.log("비밀번호 없어 Signup.vue : ");
      } else if (this.member.pwd !== this.member.pwdConfirm) {
        this.pwdError = "비밀번호가 일치하지 않습니다.";
        console.log("비밀번호 확인 틀림 Signup.vue : ");
      } else if (!this.isValidPwd(this.member.pwd)) {
        this.pwdError = "올바른 비밀번호를 입력해주세요.(8자 이상 영어+숫자)";
        console.log("비밀번호 정규식 안맞아 Signup.vue : ");
      }

      // 전체 체크
      console.log("%아무에러 없는지 검사 시작 Signup.vue : ");
      if (
        !this.emailError &&
        !this.pwdError &&
        this.emailconfirm &&
        this.uidDupl &&
        this.nicknameDupl &&
        this.emailDupl
      ) {
        console.log("%에러없어 Signup.vue line:221 ");
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        console.log(this.member);

        var raw = JSON.stringify(this.member);

        var requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };

        fetch("http://localhost:8080/members", requestOptions)
          .then((response) => response.text())
          .then((result) => console.log(result))
          .catch((error) => console.log("error", error));
        console.log(
          "%가입완료",
          "background: green; color: white; display: block;"
        );
      }
    },
    isValidEmail() {
      const emailRegex = /\S+@\S+\.\S+/;
      return emailRegex.test(this.member.email);
    },
    isValidPwd() {
      // 비밀번호는 8자 이상이어야 합니다.
      if (this.member.pwd.length < 8) {
        this.pwdError = "올바른 비밀번호를 입력해주세요.(8자 이상 영어+숫자)";
        return false;
      }

      // 비밀번호는 영문자와 숫자를 반드시 포함해야 합니다.
      const hasLetter = /[a-zA-Z]/.test(this.member.pwd);
      const hasNumber = /\d/.test(this.member.pwd);
      if (!hasLetter || !hasNumber) {
        return false;
      }

      // 모든 검증을 통과한 경우 유효한 비밀번호입니다.
      return true;
    },
    // 이메일 인증번호 발송
    async checkEmail() {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        redirect: "follow",
      };
      fetch(
        `http://localhost:8080/members/mailConfirm?email=${this.member.email}`,
        requestOptions
      )
        .then((response) => response.text())
        .then((code) => {
          this.emailcode = code;
          console.log("emailcode : " + this.emailcode);
          console.log("code : " + code);
        })
        .catch((error) => console.log("error", error));
    },
    // 이메일 인증번호 확인
    checkEmailConfirm() {
      if (this.emailconfirm == this.emailcode) {
        this.emailConfirmChk = true;
        this.emailcodeError = "인증번호 확인 완료";
      } else {
        this.emailConfirmChk = false;
        this.emailcodeError = "인증번호가 잘못되었습니다";
      }
    },

    // 아이디 중복검사
    async checkUidDupl() {
      this.uidError = ""; // 에러메시지
      this.uidDupl = ""; // true/false

      await fetch(
        `http://localhost:8080/members/checkUid?uid=${this.member.uid}`
      )
        .then((response) => response.text())
        .then((result) => {
          if (result == "false") this.uidDupl = false;
          else this.uidDupl = true;

          console.log("this.uidDupl??? : " + this.uidDupl);

          if (!this.uidDupl) {
            this.uidError = "중복된 아이디 입니다.";
          } else {
            this.uidError = "올바른 아이디 입니다.";
          }

          console.log("아이디 중복검사 결과 : " + result);
        })
        .catch((error) => console.log("error", error));
    },
    // 닉네임 중복 검사
    checkNicknameDupl() {
      this.nicknameDupl = "";
      this.nicknameError = "";
      fetch(
        `http://localhost:8080/members/checkNickname?nickname=${this.member.nickname}`
      )
        .then((response) => response.text())
        .then((result) => {
          if (result == "false") this.nicknameDupl = false;
          else this.nicknameDupl = true;

          if (!this.nicknameDupl) {
            this.nicknameError = "중복된 닉네임 입니다.";
          } else {
            this.nicknameError = "올바른 닉네임 입니다.";
          }

          console.log("닉네임 중복검사 결과 : " + result);
        })
        .catch((error) => console.log("error", error));
    },
    // 이메일 중복 검사
    checkEmailDupl() {
      this.emailDupl = "";
      this.emailError = "";
      fetch(
        `http://localhost:8080/members/checkEmail?email=${this.member.email}`
      )
        .then((response) => response.text())
        .then((result) => {
          if (result == "false") this.emailDupl = false;
          else this.emailDupl = true;

          if (!this.emailDupl) {
            this.emailError = "중복된 이메일 입니다.";
          } else {
            this.emailError = "올바른 이메일 입니다.(중복검사통과)";
          }

          console.log("이메일 중복검사 결과 : " + result);
        })
        .catch((error) => console.log("error", error));
    },
  },

  // 라이프사이클 체크

  beforeCreate() {
    console.log("beforeCreate");
  },
  created() {
    console.log("created");
  },
  beforeMount() {
    // console.log("beforeMount");
  },
  mounted() {
    console.log("mounted");
  },
  beforeUpdate() {
    // console.log("beforeUpdate");
  },
  updated() {
    console.log("updated");
  },
  beforeUnmount() {
    // console.log("beforeUnmount");
  },
  unmounted() {
    console.log("unmounted");
  },
};
</script>
<style scoped>
@import url(/css/component/component.css);
@import url(/css/component/component-sign-up.css);
</style>

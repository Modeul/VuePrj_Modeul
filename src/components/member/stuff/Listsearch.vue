<template>
    <section class="canvas b-rad-2">

        <!-- 검색창 들어가는 부분 -->
        <header class="d-fl-al">
            <div>
                    <router-link to="/member/stuff/list" class="icon icon-back">뒤로가기</router-link>
                </div>

                <div class="search-container">
                    <form action="" class="d-fl d-b-none search-form" method="get">
                        <h1 class="icon search-dodbogi m-l-6px">돋보기</h1>
                        <input type="search" id="search-bar" class="search-input m-l-6px"  placeholder="검색어 입력">
                    </form>
                </div>
        </header>

    <!-- 검색창 들어가는 부분 -->

        <nav>
            <form action="./list-search.html" method="get" class="header-categ-box">
                <div> 
                    <button class="header-categ" name="c" value="1">전체</button>
                </div>
                    
                <div>
                    <button class="header-categ" name="c" value="1">일반상품</button>
                    <button class="header-categ" name="c" value="2">딜리버리 푸드</button>
                    <button class="header-categ" name="c" value="3">대형마트 대량 물품</button>
                </div>
            </form>
        </nav>

        <main class="result-list d-none">
            <div class="d-gr li-gr list-cl" onclick="location.href='detail.html'">
                <div class="li-pic b-rad-1">사진</div>
                <div class="li-categ header-categ li-header-categ">딜리버리 푸드</div>
                <div class="li-heart icon icon-heart">
                    찬하트
                </div>
                <div class="li-subj">서강대 앞 교촌치킨 시켜드실 분</div>
                <div class="li-member">2/5</div>
                <div class="li-date">2월 3일 금 18시까지</div>
            </div>
            <div>
                <h1 class="icon icon-line">선 긋기</h1>
            </div>

            <div class="d-gr li-gr list-cl" onclick="location.href='detail.html'">
                <div class="li-pic b-rad-1">사진</div>
                <div class="li-categ header-categ li-header-categ">딜리버리 푸드</div>
                <div class="li-heart icon icon-heart">
                    찬하트
                </div>
                <div class="li-subj">서강대 앞 교촌치킨 시켜드실 분</div>
                <div class="li-member">2/5</div>
                <div class="li-date">2월 3일 금 18시까지</div>
            </div>
            <div>
                <h1 class="icon icon-line">선 긋기</h1>
            </div>
            
            <div class="d-gr li-gr list-cl" onclick="location.href='detail.html'">
                <div class="li-pic b-rad-1">사진</div>
                <div class="li-categ header-categ li-header-categ">딜리버리 푸드</div>
                <div class="li-heart icon icon-heart">
                    찬하트
                </div>
                <div class="li-subj">서강대 앞 교촌치킨 시켜드실 분</div>
                <div class="li-member">2/5</div>
                <div class="li-date">2월 3일 금 18시까지</div>
            </div>
            <div>
                <h1 class="icon icon-line">선 긋기</h1>
            </div>
        </main>


    </section>
</template>


<style scoped>
    @import "/css/component/member/stuff/component-list-search.css";
</style>
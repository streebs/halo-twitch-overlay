<template>
  <div class="mx-auto">
    <div v-if="this.currentCareerRank?.CurrentProgress && this.careerRankData?.Ranks" class="d-flex p-3 flex-column text-white main">
      <span class=" fs-1 text-nowrap custf">Hero Rank</span>
      <hr class="m-0">
      <span class="fs-6 text-nowrap custf">Daily Goal: 
        <span class="custf-1">
          <NumberAnimation ref="number1" :from="oldDailyXp" :to="currentDailyXp" :format="formatNumber = (num) => Math.round(num).toLocaleString()" :duration="5" autoplay easing="linear"/> / {{ dailyGoalXp }}
        </span>
      </span>
      <span  class="fs-1 text-nowrap custf-1"><NumberAnimation ref="number1" :from="oldxp" :to="calculate_xp" :format="formatNumber = (num) => Math.round(num).toLocaleString()" :duration="5" autoplay easing="linear"/> / 9,319,350</span>
    </div>
  </div>
</template>


<script>
  import axios from 'axios'
  import NumberAnimation from "vue-number-animation";

  export default {
    async mounted() {
      this.getCurrentCareerRank();
      this.getCareerRankData();
    },
    data() {
      return {
        xp: "",
        oldxp: "",

        currentDailyXp: 0,
        oldDailyXp: 0,
        dailyGoalXp: 50000,

        intervalId: null,

        currentCareerRank: {},
        careerRankData: {}

      }
    },
    created() {
      // this.intervalId = setInterval(() => {
      //   this.getCurrentCareerRank();
      //   this.getCareerRankData();
      // }, 300000)
      
    },  
    methods: {
      async getCurrentCareerRank() {
        await axios.get('http://127.0.0.1:8000/servicerecord/careerrank/streebs11')
              .then(response => {
                this.currentCareerRank = response.data.data
                
              })
              .catch(e => {
                console.log(`Error: ${e}`);
              })
      },
      async getCareerRankData() {
        await axios.get('http://127.0.0.1:8000/servicerecord/careerrank')
              .then(response => {
                this.careerRankData = response.data.data
              })
              .catch(e => {
                console.log(`Error: ${e}`);
              })
      },
      numberWithCommas(x) {
          return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      },
      
    },
    computed: {
      getCurrentXp(){
        if (!this.oldxp) {
          return this.xp
        }
        else{
          return this.oldxp
        }
      },
      calculate_xp() {
        let currentRank = this.currentCareerRank.CurrentProgress.Rank;
        let partialProgress = this.currentCareerRank.CurrentProgress.PartialProgress;
        let xp = 0;
        for (let i = 0; i < currentRank; i++) {
          xp += this.careerRankData.Ranks[i].XpRequiredForRank;
        }
        xp += partialProgress

        this.xp = xp

        return xp
        
      }
    },
    components: {
      NumberAnimation,
    },
    watch: {
      xp: {
        handler(newVal, oldVal) {
          if (!oldVal){
            this.oldxp = newVal
          }
          else {
            this.oldxp = oldVal;
            this.xp = newVal;
            this.currentDailyXp += (newVal - oldVal);
          }
          // this.$refs.number1.play();
        }
      },
      currentDailyXp: {
        handler(newVal, oldVal) {
          this.oldDailyXp = oldVal;
        }
      }

    }
  }
</script>


<style>
  @font-face {
      font-family: "halo-script";
      src: url('@/assets/fonts/halo3.ttf');
  }
  @font-face {
      font-family: "halo-script-2";
      src: url('@/assets/fonts/orbitron-light.ttf');
  }

  .main {
    position: relative;
    width: 550px;
    background-image: url("@/assets/images/halo-merged.png");
    background-repeat: no-repeat;
    background-size: cover;
  }

  img {
    width: 150px;
  }

  .custf {
    font-family: "halo-script";
  }
  .custf-1 {
    font-family: "halo-script-2";
  }

</style>
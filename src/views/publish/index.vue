<template>
    <el-row>
        <el-col :span="24">
            <div class="grid-content bg-purple-dark">
                <div style="background-color: #13c2c2;height: 56px;font-size: 2rem;">
                    <span style="padding-left: 3rem;">
                        <i @click="backToTable()" class="el-icon-back" />
                    </span>
                </div>
            </div>
        </el-col>
        <el-col :span="2">
            <div class="grid-content bg-purple-dark">
                <div class="body">
                    <ul>
                        <div id="marker"></div>
                        <li><a @click="goToEdit()" class="a">编 辑</a></li>
                        <li><a class="a" style="color:#13c2c2;">发 布</a></li>
                        <li><a @click="goToEdit()" class="a">统 计</a></li>
                        <li><a @click="goToEdit()" class="a">数 据</a></li>
                        <li><a @click="goToEdit()" class="a">逻 辑</a></li>
                    </ul>
                </div>
            </div>
        </el-col>
        <el-col :span="22">
            <div class="grid-content bg-purple-dark">
                <div v-if="formStatus === 0">
                    <el-button class="el-button--goon" style="width: 140px;height:37px;position: absolute;top: 50%;right: 45%;font-weight: 600;" @click="publish()">发布</el-button>
                </div>
                <div v-if="formStatus === 1">
                    <div class="demo-image" style="height:37px;position: absolute;top: 40%;right: 60%;">
                        <el-image
                        style="width: 200px; height: 200px"
                        :src="url"
                        ></el-image>
                    </div>
                    <p style="height:37px;position: absolute;top: 60%;right: 35%;">{{ address }}</p>
                    <el-button class="el-button--goon" style="width: 140px;height:37px;position: absolute;top: 50%;right: 42%;font-weight: 600;" @click="publish()">停止发布</el-button>
                </div>
            </div>
        </el-col>
    </el-row>
</template>

<script>
import formApi from '@/api/form/form'

    export default {
        data() {
            return {
                address: '',
                fits: ['cover'],
                url: 'http://localhost:9700/webApi/form/qrCode/',
                formStatus: 0
            }
        },
        methods: {
            backToTable(){
                this.$router.push({ path:'/forms/list' })
            },
            goToEdit() {
                if (this.$route.query && this.$route.query.id) {
                    this.$router.push({ path:'/edit/'+this.$route.query.id })
                } else {
                    this.$router.push({ path:'/design' })
                }
            },
            publish() {
                formApi.publish(this.$route.query.id).then(res => { 
                    if(res.data.status ===1){
                        this.address = "http://localhost:9528/#/build?id="+this.$route.query.id
                        this.formStatus = res.data.status
                    }
                })
            },
            getStatus() {
                formApi.getFormById(this.$route.query.id).then( res => {
                    if(res.data.form.status === 1){
                        this.address = "http://localhost:9528/#/build?id="+this.$route.query.id
                        this.url = this.url + this.$route.query.id
                        this.formStatus = res.data.form.status
                    }
                })
            }
        },
        created(){
            this.getStatus()
        },
        mounted(){
            const marker = document.querySelector('#marker')
            const item = document.querySelectorAll('.a')
            function indicator (e) {
                marker.style.top = e.offsetTop + 'px'
                // marker.style.width = e.offsetWidth + 'px'
            }
            item.forEach(link => {
                link.addEventListener('mousemove', e => {
                indicator(e.target)
                })
            })
        }
    }
</script>

<style scoped>
.el-icon-back:hover{
    color: #fff;
    cursor:pointer;
  }
  .body{
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 95vh;
    background: linear-gradient(45deg,#ffffff,#d4f6f63b);
    border-right: #b2cfcf solid 0.1rem;
  }
  .body ul{
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .body ul li {
    list-style: none;
  }
  .body ul li a{
    position: relative;
    font-size: 1.2rem;
    color: #051919;
    text-decoration: none;
    padding: 1rem 1rem 4rem 0rem;
    display: inline-block;
  }

  .body ul li a:hover{
    position: relative;
    font-size: 1.2rem;
    color: #13c2c2;
    text-decoration: none;
    padding: 1rem 1rem 4rem 0rem;
    display: inline-block;
  }

  #marker{
    position: absolute;
    right: -7%;
    top: 0;
    height: 2.7rem;
    width: 0.3rem;
    background: #13c2c2;
    transition: 0.5s;
    margin-top: 0.7rem;
  }
  /* 按钮风格重定义 */
 .el-button--goon {
  color: #949494;
  background-color: #e9ffff;
  border-color: #13c2c2;
  height: 34px;
  line-height: 34px;
  padding: 0 20px;
}
.el-button--goon:focus,
.el-button--goon:hover {
  color: rgb(245, 245, 245);
  background-color: #13c2c2;
  border-color: #13c2c2;
  height: 34px;
  line-height: 34px;
  padding: 0 20px;
}
.el-button--goon:active {
  color:  #13c2c2;
  background-color: #13c2c2;
  border-color: #13c2c2;
  height: 34px;
  line-height: 34px;
  padding: 0 20px;
}
/* 按钮风格重定义 */

</style>

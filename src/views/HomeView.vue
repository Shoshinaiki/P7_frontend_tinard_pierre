<template>
    <div v-for="post in posts" :key="post.id" class="card">
    <div class="postTitle"><h1> {{post.titre}}</h1>
      <div class="likecontainer">
        <div class="infobulle">
          <div class="infobulle-like">
            Pour liker le post, cliquez une 1ère fois sur le pouce. <br> Pour enlever votre like, cliquez une 2ème fois sur le pouce.
          </div>
        </div>
        <button class="like" @click= "likePost(post.id)"> 
          <p class="pLike">Like</p>
          <i v-if="(post.PostHasLikes[0].userLiked).includes(currentUser.userId)" class="fas fa-thumbs-up red"></i>
          <i v-else class="fas fa-thumbs-up black" @mouseover="thumbsLike = 1" @mouseout="thumbsLike = 0"></i>
        </button>
        <p class="compteur">{{post.PostHasLikes[0].like}}</p>
      </div>
    </div>
    <img class="image" :src="post.imageUrl" v-bind:alt="post.text">
    <div class="postText"> {{post.text}}</div>
    <div class="context"><div class="postBy"><p>Créé par: {{post.User.firstName}}</p></div> <div class="postAt"><p> le : {{post.createdAt.split("T")[0] + " à " + post.createdAt.split("T")[1].split(".")[0]}}</p></div></div>
    <div class="buttonPost">
      <div><button @click="modifyPost(post.id)" v-if="post.UserId == currentUser.userId || currentUser.role == true" class="button_modify" type="submit">Modifier</button></div>
      <div><button @click="deletePost(post.id)" class="button_delete" v-if="post.UserId == currentUser.userId || currentUser.role == true" type="submit">Supprimer</button></div>
    </div>
  </div>
</template> 

<script>
import postService from "../services/post.service"

export default {
  name: 'HomeView',
  
   data(){
        return{
           posts: [],
           thumbsLike : 0, 
        }
    },
    computed: {
      currentUser() {
        return this.$store.state.auth.user;
      },
    },
    mounted() {
      if (!this.currentUser) {
        this.$router.push("/login");
      }
      postService.getAllPost() 
      .then((response) => {
        this.posts = response.data;
        console.log(this.posts)
      })
    },
    methods: {
    deletePost(id) {
      postService.deletePost(id)
      .then(() => {
        postService.getAllPost() 
        .then((response) => {
        this.posts = response.data;
        })
    })
    },
    modifyPost(postid) {
      this.$router.push({path:'/modifypost', query: {id: postid}})
    },
    likePost(id) {
     postService.likePost(id, this.currentUser.userId)
     .then(() => {
        postService.getAllPost() 
        .then((response) => {
        this.posts = response.data;
        })
     })
    }
   }
  }
  </script>

<style lang="scss" scoped>

.card {
  display: flex;
  flex-direction: column;
  background-color: #FFD7D7;
  border-radius: 15px;
  border: solid 1px #4E5166;
  box-shadow: 5px 2px 2px #4e5166;
  width: 55%;
  padding: 1rem;
  gap: 0.5rem;
}

.context {
  display: flex;
  justify-content: space-between;
}

.postBy, .postAt, .postTitle {
  display: flex;
  width: auto;
}

.postText {
  display: flex;
  justify-content: flex-start;
  background-color: #F5F5F5;
  border-radius: 15px;
  border: solid 1px #4E5166;
  box-shadow: 5px 1px 1px #4e5166;
  padding: 1rem;
  width: auto;
}

.postTitle {
  display: flex;
  justify-content: space-between;
  width: auto;
  margin: 0 3rem 0 0;
}

.infobulle {
  position: relative;
}

.infobulle-like:hover {
  opacity: 1;
}
.infobulle-like { 
  position: absolute;
  display: flex;
  flex-flow: wrap;
  bottom: 0px;
  left: -8.5rem;
  width: 16rem;
  color: #000000;
  margin-bottom: 1rem;
  padding: 5px;
  font-size: 0.9rem;
  background-color: #ffffe1;
  border: 1px solid #000000;
  border-radius: 5px;
  opacity: 0;
} 

.likecontainer {
  position: relative;
  width: 3.5rem;
  height: 3.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: nowrap;
  margin-left: 2rem;
  cursor: pointer;
}

.like {
  display: flex;
  border: none;
  background: #FFD7D7;
  font-size: 1rem;
}

.fa-thumbs-up.black {
  margin: 1rem;
  color: black;
}

.fa-thumbs-up.red {
  margin: 1rem;
  color: red;
}

.image {
  width: 100%;
  height: 25rem;
  border-radius: 10px;
  object-fit: cover;
}


h1 {
  font-size: 1em;
  font-weight: 100;
  margin-top: 1.2em;
  margin-left: 1rem;
}


.pLike, .compteur {
  margin: 1rem  0.1rem;
}

.postBy, .postAt {
  padding: 0.5rem;
}

.buttonPost {
  display: flex;
  justify-content: space-evenly;
}

.button_modify, .button_delete {
  display: flex;
  border-radius: 10px;
  background-color: #FD2D01;
  border: 1px solid #4E5166;
  color: black;
  font-weight: bold;
  padding: 0.5rem;
  margin: 1rem;
  }


@media all and (max-width: 1000px) {
  .users {
    min-width: 55%;
  }
  .infos {
    margin: 2rem;
  }

  .fa-thumbs-up.black {
    margin: 1rem;
    color: black;
  }

  .fa-thumbs-up.red {
    margin: 1rem;
    color: red;
  }
}

@media all and (max-width: 685px) {
  .users {
    margin-left: 6.5rem;
  }
  .card {
    display: flex;
    flex-direction: column;
    border-radius: 15px;
    border: solid 1px #4E5166;
    box-shadow: 5px 2px 2px #4e5166;
    width: 70%;
    margin-left: 1rem;
    padding: 1rem;
  }
  p {
    padding: 0.5rem;
    margin-left: 2rem;
  }

  .fa-thumbs-up.black {
    margin: 1.5rem 0;
    color: black;
  }

 .fa-thumbs-up.red {
   margin: 1.5rem 0;
   color: red;
 }
  .button_modify, .button_delete {
    display: flex;
    border-radius: 10px;
    border: 1px solid #4E5166;
    padding: 0.5rem;
    margin: 1rem;
  }
}

@media all and (max-width: 650px) {

  .pLike {
     margin: 1rem 0.5rem 1rem 0.5rem;
  }
  .fa-thumbs-up.black {
    margin: 1.5rem 0;
    color: black;
  }

  .fa-thumbs-up.red {
    margin: 1.5rem 0;
    color: red;
  }
}

@media all and (max-width: 540px) {
  .fa-thumbs-up.black {
    margin: 1.5rem 0;
    color: black;
  }
  .fa-thumbs-up.red {
    margin: 1.5rem 0;
    color: red;
  }
}

@media all and (max-width: 500px) { 
  .users { 
    margin-left: 4rem;
  }

  .fa-thumbs-up.black {
    margin: 1.5rem 0;
    color: black;
  }
  .fa-thumbs-up.red {
    margin: 1.5rem 0;
    color: red;
  }
}

@media all and (max-width: 430px) {

  .fa-thumbs-up.black {
    margin: 1.5rem 0;
    color: black;
  }
  .fa-thumbs-up.red {
    margin: 1.5rem 0;
    color: red;
  }
}

@media all and (max-width: 412px) {
  .postText {
    margin-left: 0;
  }
}

@media all and (max-width: 375px) {


  h1 {
    font-size: 1em;
    font-weight: 100;
    margin-top: 1.2em;
    margin-left: 0.2em;
  }

  .pLike {
    margin: 1rem 0.5rem 1rem 0.5rem;
  }

  .infobulle-like {
    left: -110px;
  }

  .fa-thumbs-up.black {
    margin: 1.5rem 0;
    color: black;
  }
  .fa-thumbs-up.red {
    margin: 1.5rem 0;
    color: red;
  }

  .postText {
    margin-left: 0;
  }
}

@media all and (max-width: 360px) {
  h1 {
    font-size: 1em;
    margin-left: 0.2em;
  }
  .pLike {
    margin: 1rem 0.5rem 1rem 0.5rem;
    font-size: 1em;
  }

  .infobulle-like {
    left: -110px;
  }
}

@media all and (max-width: 280px) {

  .pLike {
    margin: 1rem 0.5rem 1rem 0.5rem;
  }

  p {
    margin-left: 0;
  }
}

</style>
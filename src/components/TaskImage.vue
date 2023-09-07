<template>
    <div class="edit-image">
        <div class="delete-image-button">×</div>
        <img :src="imageUrl" alt="" class="task-image">
    </div>
</template>

<script>

  export default{
    name: 'TaskImage',
    props: {
        imageUrl: {
            type: String,
        },
    },
  }
</script>

<style scoped>
    .delete-image-button{
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 15px;
        height: 15px;
        right: 5px;
        top: 5px;
        border: 1px solid #000;
        border-radius: 10px;
        cursor: pointer;
    }
    .edit-image{
        position:relative;
        width:100px;
        height:100px;
        border:1px solid #000;
    }    
    .task-image{
        width: 100px;
        height: 100px;
        object-fit: cover;
    }
</style>
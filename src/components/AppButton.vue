<template>
    <button
    class="button"
    :data-size="btnSize"
    :data-color="btnColor"
    >
    <slot></slot>
    </button>
</template>

<script lang="js">
    export default{
        name: 'AppButton',
        props: {
            btnColor: {
                type: String,
                default: () => '',
            },
            btnSize: {
                type: String,
                default: () => ''
            },
        },
    }
</script>

<style scoped>
    /* 
        共通化したいスタイル   
    */

    /* color */
    button[data-color="red"]{
        color:#E1523D;
    }

    button[data-color="blue"]{
        color:#005E54;
    }

    button[data-color="green"]{
        color:#04BFAD;
    }


    /* size */
    button[data-size="small"]{
        font-size:14px;
    }

    button[data-size="midium"]{
        font-size:18px;
    }

    button[data-size="large"]{
        font-size:24px;
    }

    @media screen and (max-width: 768px) {
        button[data-size="small"]{
        font-size:14px;
    }

    button[data-size="midium"]{
        font-size:14px;
    }

    button[data-size="large"]{
        font-size:16px;
    }
    }
</style>
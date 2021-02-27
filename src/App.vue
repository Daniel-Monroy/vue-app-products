<template>
    <div class="container-fluid">
        <Navbar/>
    </div>
    <div class="container mt-3">
        <router-view/>
    </div>
</template>
<script>
    import Navbar from './components/Navbar'
    export default{
        components:{
            Navbar
        }
    }
</script>

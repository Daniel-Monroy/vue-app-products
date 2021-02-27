<template>
    <div class="card">
        <div class="card-header">
            <h4 class="card-title" v-html="title"></h4>
        </div>
        <ValidationErrors 
            :errors="errors"
        />
        <div class="card-body">
            <form v-on:submit.prevent="submit()" method="POST" accept-charset="utf-8">
                <div class="mb-3">
                    <label for="stock" class="form-label">Cantidad (Piezas)</label>
                    <input 
                        type         = "number"
                        class        = "form-control"
                        id           = "stock"
                        v-model.number = "form.stock"
                        placeholder  = "Cantidad a agregar"
                        >
                </div>
                <input type="submit" class="btn btn-primary"   value="Agregar">
                <input type="button" class="btn btn-secondary" value="Cancelar" @click="$emit('cancele')">
            </form>
        </div>
    </div>
</template>
<script>
    import axios from 'axios'
    import ValidationErrors from '../components/ValidationErrors'
    export default{
        props:{
            record : {
                type     : Object,
                required : true,
                default  : () => {
                    return {}
                }
            },
            addStock : {
                type     : Boolean,
                required : true,
                default  : false,
            },
            removeStock : {
                type     : Boolean,
                required : true,
                default  : false,
            },
        },
        emmits:[
            'cancele'
        ],
        components : {
            ValidationErrors,
        },
        data() {
            return {
                errors : {},
                form   : {
                    stock : 1,
                }
            }
        },
        computed:{
            title:function(){
                return this.addStock ? 'Agregar stock' : 'Remover Stock';
            }
        },
        methods:{
            submit(){
                if(this.addStock)
                    this.record.stock = Number(this.record.stock) + this.form.stock
                else
                    this.record.stock = Number(this.record.stock) - this.form.stock
                let url = 'http://localhost:8080/products/updateStock/' + this.record.id;
                axios.put(url, this.record)
                .then(result => {
                    Swal.fire({
                        toast             : true,
                        showConfirmButton : false,
                        timer             : 6000,
                        position          : 'top-end',
                        icon              : 'success',
                        title             : 'Stock almacenado', 
                    });
                    this.$emit('updated', this.record)
                })
                .catch(errors => {
                    if(errors.response != ''){
                        this.errors = errors.response.data
                    }
                })
            }
        }
    }
</script>

<template>
    <div>
        <div class="card" v-if=" ! actions.updating">
            <div class="card-header">
                <h4 class="card-title">Productos</h4>
            </div>
            <ValidationErrors 
                :errors="errors"
            />
            <Errors v-if="showErrors"/>
            <div class="card-body"  v-if=" ! showErrors">
                <div class="table-responsive" >
                    <table class="table table-borderless table-striped">
                        <thead>
                            <tr>
                                <th width="5%">&nbsp;</th>
                                <th width="10%" align="left">  
                                    <span @click="orderBy">
                                        <i class="fas fa-sort"></i> #
                                    </span>
                                </th>
                                <th width="20%">Código</th>
                                <th width="20%">Nombre</th>
                                <th width="20%">Stock</th>
                                <th width="20%">
                                    Acciones
                                </th>
                                <th width="5%">&nbsp;</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in records_filter" :key="item.id">
                                <td>&nbsp;</td>
                                <td v-html="item.id"   align="left"></td>
                                <td v-html="item.code" align="left"></td>
                                <td v-html="item.name"></td>
                                <td v-html="item.stock" align="left"></td>
                                <td>
                                    <div class="btn-group">
                                        <button class="btn btn-primary btn-sm" @click="addStock(item)">
                                            <i class="fas fa-plus"></i> Stock
                                        </button>
                                        <button class="btn btn-danger btn-sm" @click="removeStock(item)">
                                            <i class="fas fa-minus"></i> Stock
                                        </button>
                                    </div>
                                </td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <Update 
            :record      = "form"
            :addStock    = "actions.addStock"
            :removeStock = "actions.removeStock"
            :records     = "records"
            @updated     = "actionUpdate"
            @cancele     = "this.actions.updating = false"
            v-if         = "this.actions.updating"
        />
    </div>
</template>
<script charset="utf-8">
    import axios            from 'axios'
    import ValidationErrors from '../components/ValidationErrors'
    import Errors           from '../components/Errors'
    import Update           from './Update'
    export default {
        name:"Products",
        data(){
            return{
                records        : {},
                records_filter : {},
                errors         : {},
                order          : 'ASC',
                actions : {
                    updating    : false,
                    addStock    : false,
                    deleteStock : false,
                },
                form       : {},
                showErrors : false,
            }
        },
        components:{
            Update,
            ValidationErrors,
            Errors,
        },
        mounted(){
            this.getProducts()
        },
        methods:{
            orderBy(){
                if(this.order == 'ASC')
                {
                    this.records_filter = this.records.sort((a,b) => (a.id > b.id) ? -1 : ((b.id > a.id) ? 1 : 0))
                    this.order = 'DESC'
                }
                else
                {
                    this.records_filter = this.records.sort((a,b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0))
                    this.order = 'ASC'
                }
            },
            getProducts(order = 'DESC'){
                this.records    = {}
                this.showErrors = false;
                axios.get('http://localhost:8080/products/get?shorBy='+order)
                .then(response => {
                    this.records        = response.data
                    this.records_filter = {
                        ...this.records
                    }
                })
                .catch(e => {
                    if(e.message == "Network Error"){
                        this.showErrors = true;
                    }
                })
            },
            addStock(item){
                this.form                = item;
                this.actions.updating    = true;
                this.actions.addStock    = true;
                this.actions.deleteStock = false;
            },
            removeStock(item){
                this.form                = item;
                this.actions.updating    = true;
                this.actions.addStock    = false;
                this.actions.deleteStock = true;
            },
            actionUpdate(product){
                this.records.splice(this.records.findIndex(item => item.id === this.form.id), 1, product)
                this.actions.updating = false;
            }
        }
    }
</script>

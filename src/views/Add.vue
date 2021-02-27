<template>
    <div class="card">
        <div class="card-header">
            <h4 class="card-title">Agregar producto</h4>
        </div>
        <ValidationErrors 
            :errors="errors"
        />
        <div class="card-header alert alert-warning" v-if="showErrors">
            <p>Ha ocurrido un problema, por favor verifique las siguientes opciones:</p>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">Que el servidor se esté ejecutando en la dirección: <strong>http://localhost:8080/</strong> </li>
                <li class="list-group-item">Que la applicación se esté ejecutando en la dirección: <strong>http://localhost:8081/</strong> </li>
                <li class="list-group-item">Que el código del producto no sea repedito</li>
            </ul>
        </div>
        <div class="card-body">
            <form v-on:submit.prevent="submit()">
                <div class="mb-3">
                    <label for="name" class="form-label">Producto</label>
                    <input 
                        type         = "text"
                        class        = "form-control"
                        id           = "name"
                        v-model.trim = "form.name"
                        placeholder  = "Nombre del producto"
                        >
                </div>
                <div class="mb-3">
                    <label for="stock" class="form-label">Cantidad (Piezas)</label>
                    <input 
                        type         = "number"
                        class        = "form-control"
                        id           = "stock"
                        v-model.trim = "form.stock"
                        placeholder  = "Cantidad del producto"
                        >
                </div>
                <div class="mb-3">
                    <label for="code" class="form-label">Código</label>
                    <input 
                        type         = "text"
                        class        = "form-control"
                        id           = "code"
                        v-model.trim = "form.code"
                        placeholder  = "Código de inventario (Unico)"
                        >
                </div>
                <input type="submit" class="btn btn-primary btn-block" value="Agregar">
            </form>
        </div>
    </div>
</template>
<script>
    import axios            from 'axios'
    import router           from '../router'
    import ValidationErrors from '../components/ValidationErrors'
    export default{
        data(){
            return {
                form : {
                    name  : '',
                    stock : 0,
                    code  : '',
                },
                errors     : {},
                showErrors : false,
            }
        },
        components:{
            ValidationErrors,
        },
        methods:{
            validated(){
                if(this.form.name === '' || this.form.name === '' || this.form.name === ''){
                    Swal.fire({
                        toast             : true,
                        showConfirmButton : false,
                        timer             : 6000,
                        position          : 'top-end',
                        icon              : 'warning',
                        title             : 'Por favor complete todos los campos', 
                    });
                    return false;
                }
                return true;
            },
            submit(){
                if(this.validated()){
                    this.showErrors = false;
                    axios.post('http://localhost:8080/products/add', this.form)
                    .then(response => {
                        Swal.fire({
                            toast             : true,
                            showConfirmButton : false,
                            timer             : 6000,
                            position          : 'top-end',
                            icon              : 'success',
                            title             : 'Registro almacenado', 
                        });
                        router.push('/')
                    })
                    .catch(errors => {
                        if(errors.response.status === 500){
                            this.showErrors = true;
                        }
                        if(errors.response != ''){
                            this.errors = errors.response.data
                        }
                    })
                }
            }
        },
    }
</script>

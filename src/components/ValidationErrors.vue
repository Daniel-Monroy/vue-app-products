<template>
    <div class="card-header container pb-3" v-if="hasErrors">
        <div class="alert alert-light">
            <ul class="list-group list-group-flush">
                <li 
                    v-for = "(value, index) in validationErrors"
                    :key  = "index"
                    class = "list-group-item bg-light text-danger border-bottom-0 my-0 py-0">
                    > <span v-html="value"></span>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    export default {
        props : [
            'errors'
        ],
        computed: {
            validationErrors(){
                let errors = Object.values(this.errors);
                errors     = errors.flat();
                return errors;
            },
            hasErrors(){
                return Object.keys(this.errors).length > 0
            }
        }
    }
</script>

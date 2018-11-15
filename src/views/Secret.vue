<template>
    <div>
        Modifier mon secret code
        <input type="text" v-model="value">
        <button @click="modifySecretCode">Envoyer</button>
        <router-link to="/">Retour</router-link>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: "Secret",
        data() {
            return {
                value: null
            }
        },
        methods: {
            setValue(value) {
                this.value = value
            },
            modifySecretCode() {
                let data = {name: this.value}
                fetch('http://localhost:4001/secretModify', {
                    method: 'PUT',
                    body: JSON.stringify(data),
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json'
                    }
                })
                    .then(r => {
                        alert('Ok !')
                    })
                    .catch(e => alert('Une erreur s\'est produite'))
            }
        },
        mounted() {
            axios.get('http://localhost:4001/secret')
                .then(r => this.setValue(r.data))
                .catch(e => console.log(e))
        }
    }
</script>
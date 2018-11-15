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

    const instance = axios.create({
        baseURL: 'http://localhost:4001',
        headers: {
            'Authorization': 'Bearer ksdjfglksgflksgsjdhglaslfkhgasf'
        }
    })


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
                let data = JSON.stringify({
                    name: this.value
                })
                fetch('http://localhost:4001/secretModify', {
                    method: 'POST',
                    body: data,
                    headers: {
                        'Accept': 'application/json'
                    }
                })
                    .then(r => {
                        console.log(r)
                        alert('Ok !')
                    })
                    .catch(e => alert('Une erreur s\'est produite'))
                // instance.post('http://localhost:4001/secretModify', data, {
                //     headers: {
                //         'Content-Type': 'application/json',
                //         'Access-Control-Allow-Origin': '*',
                //         'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
                //         'Access-Control-Allow-Headers': 'Authorization'
                //     }
                // })
                //     .
            }
        },
        mounted() {
            axios.get('http://localhost:4001/secret')
                .then(r => this.setValue(r.data))
                .catch(e => console.log(e))
        }
    }
</script>
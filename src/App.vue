<template>
    <div>
        <div class="title">
            Application - Exercice 5
        </div>
        <div v-for="element in paginationElement">
            {{ element }}
        </div>
        <button @click="nextPage">Suivant</button>
        <button @click="prevPage">Precedent</button>
        <transition name="slide-fade" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
    import axios from 'axios'
    import moment from 'moment'

    const sizePage = 10

    export default {
        name: "App",
        data() {
            return {
                resetVariable: false,
                last100Request: [],
                pageNumber: 0,
                currentStartIndexPage: 0,
                currentEndIndexPage: sizePage,
                paginationElement: []
            }
        },
        methods: {
            append(element) {
                this.resetVariable = !this.resetVariable
                if (this.last100Request.length >= 100) {
                    this.last100Request.pop()
                }
                this.last100Request.unshift(element)
            },
            nextPage() {
                this.currentStartIndexPage += sizePage
                this.currentEndIndexPage += sizePage
                this.pageNumber++;
            },
            prevPage() {
                this.currentStartIndexPage -= sizePage
                this.currentEndIndexPage -= sizePage
                this.pageNumber--;
            },
            sliceArray() {
                console.log(this.last100Request.slice(this.currentStartIndexPage, this.currentEndIndexPage))
                this.paginationElement = this.last100Request.slice(this.currentStartIndexPage, this.currentEndIndexPage)
            }
        },
        mounted() {
            setInterval(() => {
                let dateMoment = moment()
                let serv1 = new Promise(((resolve, reject) => {
                    axios.get('http://localhost:4000')
                        .then(response => {
                            resolve({1 : response.data.time})
                        })
                        .catch(e => resolve({1 : 'DOWN'}))
                }))
                let serv2 = new Promise(((resolve, reject) => {
                    axios.get('http://localhost:4001/secret')
                        .then(response => {
                            resolve({2 : response.data})
                        })
                        .catch(e => resolve({2 : 'DOWN'}))
                }))
                let serv3 = new Promise(((resolve, reject) => {
                    axios.get('http://localhost:4002/10')
                        .then(response => {
                            resolve({3: response.data})
                        })
                        .catch(e => resolve({3 : 'DOWN'}))
                }))

                Promise.all([serv1, serv2, serv3])
                    .then(response => {
                        let results = {date: dateMoment, data: {
                                1 : null,
                                2 : null,
                                3 : null
                            }
                        }
                        response.forEach((value) => {
                            results.data[Object.keys(value)] = Object.values(value)
                        })
                        this.append(results)
                        this.sliceArray()
                    })
            }, 1000)
        }
    }
</script>
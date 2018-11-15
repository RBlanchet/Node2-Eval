<template>
    <div>
        <div class="title">
            Application - Exercice 5
        </div>
        <div v-for="element in sliceArray">
            {{ element }}
        </div>
        <transition name="slide-fade" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
    import axios from 'axios'
    import moment from 'moment'

    export default {
        name: "App",
        data() {
            return {
                resetVariable: false,
                last100Request: [],
                pageNumber: 0,
                sizePage: 10,
                currentStartIndexPage: 0,
                currentEndIndexPage: this.sizePage,
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
                this.pageNumber++;
            },
            prevPage() {
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
                            resolve({1 : response.data})
                        })
                        .catch(e => resolve({1 : 'DOWN'}))
                }))
                let serv2 = new Promise(((resolve, reject) => {
                    axios.get('http://localhost:4001')
                        .then(response => {
                            resolve({2 : response.data})
                        })
                        .catch(e => resolve({2 : 'DOWN'}))
                }))
                // let serv3 = new Promise(((resolve, reject) => {
                //     axios.get('http://localhost:4002')
                //         .then(response => {
                //             resolve(response)
                //         })
                //         .catch(e => resolve({3 : 'DOWN'}))
                // }))

                Promise.all([serv1, serv2])
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
                    })
            }, 1000)
        }
    }
</script>
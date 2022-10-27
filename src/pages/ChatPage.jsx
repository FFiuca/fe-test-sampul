import React, { Component, createRef } from 'react'
import Aos from 'aos';
import axios from 'axios';
import { config } from '../config/env';

import { bindPusher } from '../helper/pusher';

import { MainContextConsumer, Context } from '../contexts/MainContext';

export default class ChatPage extends Component {
    static contextType = Context

    constructor(props){
        super(props)
        this.messageRef = createRef()
    }

    state = {
        chats:[],
        message: null
    }

    componentDidMount(){
        Aos.init()

        // console.log(this)
        // console.log(window.pusher)

        this.getChats()

        bindPusher(this.getChats)
    }

    // changeState = (data)=>{
    //     let state = Object.assign(this.state, data)


    //     this.setState(()=>{
    //         return {...state}
    //     } )
    // }

    sendMessage = async(e)=>{
        console.log('send Message')

        let message = this.messageRef.current.value // current mengambil dom terkait

        console.log(this.messageRef)
        try{
            const req = await axios({
                url: config.endPoint+'addChat',
                method: 'post',
                responseType: 'json',
                data: {
                    room_id: this.context.room_id,
                    username: this.context.username,
                    message: message
                }
            })

            console.log(req)
        }catch(error){
            console.log('error send Message', error)
        }
    }

    getChats = async ()=>{
        console.warn('get chats')

        try {
            const chats = await axios({
                url: config.endPoint+'getChatByRoom',
                responseType: 'json',
                method: 'post',
                data:{
                    room_id: this.context.room_id
                    // room_id: 1
                }
            })

            console.log(chats)

            this.setState(()=>{
                return {
                    chats : chats.data.data
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    render() {
        return (
            <MainContextConsumer>
                {
                    value => {
                        console.log('value', value)
                        return (
                            <div>
                                <main className="main-content  mt-0">
                                    <div className="page-header align-items-start min-vh-100" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1497294815431-9365093b7331?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80)' }}>
                                    <span className="mask bg-gradient-dark opacity-6"></span>
                                    <div className="container my-auto">
                                        <div className="row">
                                        <div className="col-lg-6 col-md-8 col-12 mx-auto">
                                            <div className="card z-index-0 fadeIn3 fadeInBottom">
                                            <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                                                <div className="bg-gradient-primary shadow-primary border-radius-lg py-3 pe-1">
                                                <h4 className="text-white font-weight-bolder text-center mt-2 mb-0">Chat Room</h4>

                                                </div>
                                            </div>
                                            <div className="card-body">
                                                <div className="row mb-2">
                                                    <div className="col">
                                                        <div className="card">
                                                            <div className="card-body" style={{ maxHeight: '500px', overflowY: 'auto' }}>
                                                                {
                                                                    // ()=>{
                                                                        this.state.chats.map((el, idx)=>{
                                                                            const c = el.username===value.username? 'row mb-1 d-flex justify-content-end' : 'row mb-1'
                                                                            return (


                                                                                        <div className={c} key={idx}>
                                                                                            <div className="col-10 form">
                                                                                                {el.username}
                                                                                            <div className="input-group input-group-outline mb-3"><label className="form-label"></label><input type="text" value={el.message} className="form-control" readOnly="true" /></div>
                                                                                            </div>
                                                                                        </div>


                                                                            )
                                                                        })
                                                                    // }
                                                                }


                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col">

                                                        <div role="form" className="text-start">
                                                        <div className="input-group input-group-outline mb-3">
                                                            <label className="form-label">Message</label>
                                                            <input type="text" ref={this.messageRef} className="form-control" />
                                                        </div>
                                                        <div className="text-center">
                                                            <button type="button" className="btn bg-gradient-primary w-100 my-4 mb-2" onClick={(e)=> this.sendMessage(e)}>Send</button>
                                                        </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                    </div>
                                </main>
                            </div>
                        )
                    }
                }

            </MainContextConsumer>
        );
    }
}


import React, { Component, createContext } from 'react';
import { default as axios } from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate, useNavigation } from 'react-router-dom';

import 'react-toastify/dist/ReactToastify.css';

import { config } from '../config/env';

const Context = createContext();

const WrapNav = ()=>{

    const navigation = useNavigation()

    console.log('navigation', navigation)

    return (<MainContext navigation={navigation} halo="oeoe"/>)
}

class MainContext extends Component {

    state = {
        room_id : null,
        username : null
    }

    componentDidMount(){
        // (()=>{
        //     toast('hallo')
        // })()

        console.log(this.props, this.props.navigation)

        // setTimeout(()=>{
        //     this.props.navigate('/chat')
        // }, 1000)
    }

    enterRoom = async (room, username) =>{
        console.log(room, username)

        try{
            const url = config.endPoint+'roomCreate'
            console.log(url)

            // const req = await axios.post(url, {
            //                 params: {
            //                     room: room
            //                 }
            //             })

            let req = await axios({
                // headers:{
                //     'Content-Type': 'application/json'
                // },
                method: 'post',
                url: url,
                responseType: 'json',
                data: {room: room}
            })
            console.log(req, req.data.data.id, req.data.message)
            const room_id = req.data.data.id

            this.setState(()=>{
                return {room_id: room_id, username: username}
            })

            toast(req.data.message, {
                autoClose: 5000,
                pauseOnHover: false,
            })

            toast('Redirect to chat page in 1 second', {
                autoClose: 5000,
                pauseOnHover: false,
            })

            setTimeout(()=>{
                this.props.navigate('/chat')

                // window.location.href = 'http://127.0.0.1:3001'
            }, 1000)

            // console.log('toast')
        }catch(e){
            // alert('Error')

            console.log(e)
        }


    }

    render() {
        // const {}
        return (
            <Context.Provider value={{ ...this.state, enterRoom: this.enterRoom }}>
                <>
                    {this.props.children}
                    <ToastContainer />
                </>
            </Context.Provider>
        );
    }
}

export default MainContext;

const MainContextConsumer = Context.Consumer

export { MainContextConsumer, Context, WrapNav }



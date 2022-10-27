import React, { Component } from 'react';
import { createContext } from 'react';
import { MainContextConsumer } from '../../contexts/MainContext';

class Main extends Component {
    state = {
        username: null,
        room: null
    }

    setName = (e)=>{
        this.setState(()=>{
            return {username: e.target.value}
        })

        console.log(e)
    }

    setRoom = (e)=>{
        this.setState(()=>{
            return {room: e.target.value}
        })
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
                                    <section>
                                    <div className="page-header min-vh-100">
                                        <div className="container">
                                        <div className="row">
                                            <div className="col-6 d-lg-flex d-none h-100 my-auto pe-0 position-absolute top-0 start-0 text-center justify-content-center flex-column">
                                            <div className="position-relative bg-gradient-primary h-100 m-3 px-7 border-radius-lg d-flex flex-column justify-content-center" style={{ backgroundImage: "url('/assets/img/illustrations/illustration-signup.jpg')", backgroundSize: 'cover' }}>
                                            </div>
                                            </div>
                                            <div className="col-xl-4 col-lg-5 col-md-7 d-flex flex-column ms-auto me-auto ms-lg-auto me-lg-5">
                                            <div className="card card-plain">
                                                <div className="card-header">
                                                <h4 className="font-weight-bolder">Mini Chat Apps</h4>
                                                <p className="mb-0">Enter your Name and Room ID to register</p>
                                                </div>
                                                <div className="card-body">
                                                <form role="form">
                                                    <div className="input-group input-group-outline mb-3">
                                                        <label className="form-label">Name</label>
                                                        <input type="text" className="form-control" onChange={(e)=>this.setName(e)}/>
                                                    </div>
                                                    <div className="input-group input-group-outline mb-3">
                                                        <label className="form-label">Room ID</label>
                                                        <input type="number" className="form-control" onChange={e=>this.setRoom(e)}/>
                                                    </div>

                                                    <div className="text-center">
                                                    <button type="button" className="btn btn-lg bg-gradient-primary btn-lg w-100 mt-4 mb-0" onClick={()=>{value.enterRoom(this.state.room, this.state.username)}}>Enter Room</button>
                                                    </div>
                                                </form>
                                                </div>
                                                <div className="card-footer text-center pt-0 px-lg-2 px-1">

                                                </div>
                                            </div>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                    </section>
                                </main>
                            </div>
                        )
                    }
                }

            </MainContextConsumer>
        );
    }
}

export default Main;

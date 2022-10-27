import Pusher from "pusher-js";

const pusher_ = new Pusher('d3f5ac2586a718dc8745', {
    cluster: 'ap1'
})

pusher_.connection.bind('connected', (res)=>{
    console.log('pusher connected', res)
});

pusher_.connection.bind( 'error', function( err ) {
    console.log('check connection error')

    if( err.error.data.code === 4004 ) {
      console.log('Over limit!');
    }

  });

const channel_ = pusher_.subscribe('my-channel')

const bindPusher = (callback)=>{
    console.log('bind pusher')
    // Pusher.log('custom')

    channel_.bind('my-event', callback)
}

export { bindPusher };


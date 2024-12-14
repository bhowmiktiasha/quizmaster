
import { Hourglass } from 'react-loader-spinner';

const LoadMe = () => {
	return ( 
        <div style={{position: "fixed", top: "0", left: "0", background: '#242224', zIndex: "998", height: "100%", width: "100%"}}>
		<div style={{ position: "absolute", top: "50%", left: "50%", transform:"translate(-50%, -50%)", zIndex: "1000", background: '#242224'}}>
        <Hourglass
        visible={true}
        height="80"
        width="80"
        ariaLabel="hourglass-loading"
        wrapperStyle={{}}
        wrapperClass=""
        colors={['#306cce', '#72a1ed']}
        />
           
		</div>
        </div>
      
	);
};

export default LoadMe;
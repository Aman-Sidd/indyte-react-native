import { useState } from "react";
import { Dimensions } from "react-native";

const SCREEN_HEIGHT = Dimensions.get('window').height;
function useLayout(props) {
    const [viewHeight,setViewHeight] = useState(0);
    function getViewHeight(event){
        if(viewHeight) return;
        let {height} = event.nativeEvent.layout
        setViewHeight(height - SCREEN_HEIGHT)
    }
    return [viewHeight,getViewHeight]
}

export default useLayout;
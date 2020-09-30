import React from 'react';
import { MehTwoTone } from '@ant-design/icons'

function NoMatch(){
    return(
        <div style={{margin:'100px auto',textAlign:'center'}}>
            <div style={{fontSize:'3em'}}>
                <MehTwoTone />
            </div>
            <div>
                No matched
            </div>
        </div>
    )
}
export default NoMatch;

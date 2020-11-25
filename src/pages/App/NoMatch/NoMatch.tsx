import React from 'react';
import { MehTwoTone } from '@ant-design/icons'

function NoMatch(){
    return(
        <div style={{margin:'auto',textAlign:'center',padding: '100px'}}>
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

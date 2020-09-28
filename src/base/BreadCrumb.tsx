import React from "react";
import {Breadcrumb} from "antd";

function BreadCrumb(){
    return(
        <Breadcrumb separator={'>'} style={{ margin: '16px 0' }}>
            {
                ['Home','List','App'].map((item)=>{
                    return(
                        <Breadcrumb.Item key={item}>{item}</Breadcrumb.Item>
                    )
                })
            }
        </Breadcrumb>
    )
}
export default BreadCrumb

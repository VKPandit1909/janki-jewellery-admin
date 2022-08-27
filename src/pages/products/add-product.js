import { Select } from "antd";
import React, { useEffect, useState } from "react";

const AddProduct = () => {
    const [attributes, setAttributes] = useState(null);
    useEffect(() => {
        // const title = getAttributes();
        // title.map()
    },[]);
    return(
        <div>
            <Select onChange={(val) => console.log(val)}>
                  <Select.Option value="Custom">Custom</Select.Option>
                  <Select.Option value="Size">Size</Select.Option>
                  <Select.Option value="Color">Color</Select.Option>
                </Select>
                <Select onChange={(val) => console.log(val)}>
                  <Select.Option value="Custom">Custom</Select.Option>
                  <Select.Option value="Size">Size</Select.Option>
                  <Select.Option value="Color">Color</Select.Option>
                </Select>
        </div>
    );
};
export default AddProduct;
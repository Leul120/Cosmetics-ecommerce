import React, { useEffect } from 'react';
import { Modal, Form, Input, Select, Button, InputNumber, Checkbox, Upload, Space } from 'antd';
import { PlusOutlined, MinusCircleOutlined, UploadOutlined } from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea';
import moment from 'moment';
import { FaTrashAlt } from 'react-icons/fa';

const { Option } = Select;


const ProductModal = ({ isModalVisible, currentProduct, categories, selectedCategory, onSubmit, onCancel }) => {
  const [form] = Form.useForm(); 

  
  console.log(currentProduct)
   useEffect(() => {
  if (isModalVisible) {
    if (currentProduct) {
    
      const updatedProduct = {
        ...currentProduct,
        expirationDate: currentProduct.expirationDate ? new Date(currentProduct.expirationDate).toLocaleDateString() : null,
        discount: {
          ...currentProduct.discount,
          validUntil: currentProduct.discount?.validUntil ? new Date(currentProduct.discount.validUntil).toLocaleDateString() : null,
        },
      };
      form.setFieldsValue(updatedProduct); // Set form fields when editing
    } else {
      form.resetFields(); // Reset form when adding a new product
    }
  }
}, [isModalVisible, currentProduct, form]);
const handleDeleteImage=async ()=>{

}

  return (
    <Modal
      title={currentProduct ? `Edit ${selectedCategory}` : `Add ${selectedCategory}`}
      visible={isModalVisible}
      onCancel={onCancel}
      footer={null}
    >
      <Form form={form} onFinish={onSubmit} initialValues={currentProduct} className='flex flex-col gap-3'>

        {/* Add custom fields based on the selected category */}
        {selectedCategory === 'bodycare' && (<>
        <Form.Item name="name" label="Product Name" rules={[{ required: true, message: 'Please input the product name!' }]}>
    <Input />
  </Form.Item>

  <Form.Item name="brand" label="Brand" rules={[{ required: true, message: 'Please input the brand name!' }]}>
    <Input />
  </Form.Item>

  <Form.Item name="type" label="Type" rules={[{ required: true, message: 'Please select the product type!' }]}>
    <Select>
      <Option value="lotion">Lotion</Option>
      <Option value="scrub">Scrub</Option>
      <Option value="deodorant">Deodorant</Option>
      <Option value="body wash">Body Wash</Option>
      <Option value="body butter">Body Butter</Option>
      <Option value="body oil">Body Oil</Option>
    </Select>
  </Form.Item>

  <Form.Item name="description" label="Product Description">
    <Input.TextArea rows={3} />
  </Form.Item>

  {/* Ingredients */}
  <Form.Item name="ingredients" label="Ingredients">
    <Form.List name="ingredients">
      {(fields, { add, remove }) => (
        <>
          {fields.map(({ key, name, fieldKey, ...restField }) => (
            <div key={key} style={{ display: 'flex', marginBottom: 8 }}>
              <Form.Item {...restField} name={name} fieldKey={fieldKey} style={{ flexGrow: 1 }}>
                <Input placeholder="Ingredient" />
              </Form.Item>
              <MinusCircleOutlined onClick={() => remove(name)} style={{ marginLeft: 8, color: 'red' }} />
            </div>
          ))}
          <Button type="dashed" onClick={() => add()} icon={<PlusOutlined />}>
            Add Ingredient
          </Button>
        </>
      )}
    </Form.List>
  </Form.Item>

  {/* Sizes */}
  <Form.Item label="Sizes">
    <Form.List name="sizes">
      {(fields, { add, remove }) => (
        <>
          {fields.map(({ key, name, fieldKey, ...restField }) => (
            <div key={key} style={{ display: 'flex', marginBottom: 8 }}>
              <Form.Item {...restField} name={[name, 'size']} fieldKey={[fieldKey, 'size']} style={{ flexGrow: 1 }}>
                <Input placeholder="Size (e.g., 200ml, 8oz)" />
              </Form.Item>
              <Form.Item {...restField} name={[name, 'price']} fieldKey={[fieldKey, 'price']} style={{ flexGrow: 1 }}>
                <InputNumber placeholder="Price" min={0} style={{ width: '100%' }} />
              </Form.Item>
              <MinusCircleOutlined onClick={() => remove(name)} style={{ marginLeft: 8, color: 'red' }} />
            </div>
          ))}
          <Button type="dashed" onClick={() => add()} icon={<PlusOutlined />}>
            Add Size
          </Button>
        </>
      )}
    </Form.List>
  </Form.Item>

  <Form.Item name="weight" label="Weight">
    <Input placeholder="e.g., 150g" />
  </Form.Item>

  <Form.Item name="skinType" label="Skin Type">
    <Select>
      <Option value="normal">Normal</Option>
      <Option value="dry">Dry</Option>
      <Option value="oily">Oily</Option>
      <Option value="sensitive">Sensitive</Option>
      <Option value="combination">Combination</Option>
    </Select>
  </Form.Item>

  <Form.Item name="fragrance" label="Fragrance">
    <Input placeholder="e.g., lavender, citrus" />
  </Form.Item>

  <Form.Item name="usageInstructions" label="Usage Instructions">
    <Input.TextArea rows={2} />
  </Form.Item>

  <Form.Item name="benefits" label="Benefits">
    <Form.List name="benefits">
      {(fields, { add, remove }) => (
        <>
          {fields.map(({ key, name, fieldKey, ...restField }) => (
            <div key={key} style={{ display: 'flex', marginBottom: 8 }}>
              <Form.Item {...restField} name={name} fieldKey={fieldKey} style={{ flexGrow: 1 }}>
                <Input placeholder="Benefit" />
              </Form.Item>
              <MinusCircleOutlined onClick={() => remove(name)} style={{ marginLeft: 8, color: 'red' }} />
            </div>
          ))}
          <Button type="dashed" onClick={() => add()} icon={<PlusOutlined />}>
            Add Benefit
          </Button>
        </>
      )}
    </Form.List>
  </Form.Item>

  <Form.Item name="safetyWarnings" label="Safety Warnings">
    <Input.TextArea rows={2} />
  </Form.Item>

  {/* Stock & Marketing */}
  <Form.Item name="stock" label="Available Stock">
    <InputNumber min={0} style={{ width: '100%' }} />
  </Form.Item>

  <Form.Item name="isFeatured" label="Featured Product" valuePropName="checked">
    <Checkbox />
  </Form.Item>

  <Form.Item name={['discount', 'percentage']} label="Discount Percentage">
    <InputNumber min={0} max={100} style={{ width: '100%' }} />
  </Form.Item>

  <Form.Item name={['discount', 'validUntil']} label="Discount Valid Until">
    <Input style={{ width: '100%' }} />
  </Form.Item>

  <Form.Item name="expirationDate" label="Expiration Date">
    <Input style={{ width: '100%' }} />
  </Form.Item>

  {/* Images */}
  <div className="mt-4 grid grid-cols-3 gap-4">
    {currentProduct?.images?.map((image) => (
      <div key={image.publicId} className="relative border w-20 h-20">
        <img
          src={image.imageUrl}
          alt="Uploaded"
          className="object-cover rounded-md"
        />
        <button
          type="button"
          onClick={() => handleDeleteImage(image.publicId)}
          className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-400 transition"
        >
          <FaTrashAlt />
        </button>
      </div>
    ))}
  </div>

  
  
        </>
 )}
        {selectedCategory === 'fragrance' && (
          <>
            <Form.Item name="name" label="Fragrance Name" rules={[{ required: true, message: 'Please enter the fragrance name' }]}>
    <Input placeholder="Fragrance Name" />
  </Form.Item>

  {/* Brand */}
  <Form.Item name="brand" label="Brand" rules={[{ required: true, message: 'Please enter the brand' }]}>
    <Input placeholder="Brand" />
  </Form.Item>

  {/* Price */}
  <Form.Item name="price" label="Price" rules={[{ required: true, message: 'Please enter the price' }]}>
    <InputNumber min={0} step={0.01} placeholder="Price" style={{ width: '100%' }} />
  </Form.Item>

  {/* Type */}
  <Form.Item name="type" label="Type" rules={[{ required: true, message: 'Please select the type' }]}>
    <Select placeholder="Select Type">
      <Select.Option value="perfume">Perfume</Select.Option>
      <Select.Option value="cologne">Cologne</Select.Option>
      <Select.Option value="body spray">Body Spray</Select.Option>
      <Select.Option value="eau de toilette">Eau de Toilette</Select.Option>
      <Select.Option value="eau de parfum">Eau de Parfum</Select.Option>
    </Select>
  </Form.Item>

  {/* Gender */}
  <Form.Item name="gender" label="Gender" rules={[{ required: true, message: 'Please select the gender' }]}>
    <Select placeholder="Select Gender">
      <Select.Option value="unisex">Unisex</Select.Option>
      <Select.Option value="male">Male</Select.Option>
      <Select.Option value="female">Female</Select.Option>
    </Select>
  </Form.Item>

  {/* Sizes */}
  <Form.Item label="Sizes" name="sizes">
    <Form.List name="sizes">
      {(fields, { add, remove }) => (
        <>
          {fields.map((field) => (
            <div key={field.key} className="flex gap-2 items-center">
              <Form.Item
                {...field}
                name={[field.name, 'size']}
                rules={[{ required: true, message: 'Please enter the size' }]}
              >
                <Input placeholder="Size (e.g., 100ml)" />
              </Form.Item>
              <Form.Item
                {...field}
                name={[field.name, 'price']}
                rules={[{ required: true, message: 'Please enter the price' }]}
              >
                <InputNumber placeholder="Price" min={0} style={{ width: '100%' }} />
              </Form.Item>
              <Button danger onClick={() => remove(field.name)}>Remove</Button>
            </div>
          ))}
          <Button type="dashed" onClick={() => add()} block>
            Add Size
          </Button>
        </>
      )}
    </Form.List>
  </Form.Item>

  {/* Scent Profile */}
  <Form.Item name="scentProfile" label="Scent Profile">
    <Select mode="tags" placeholder="Enter scent profile(s)">
      <Select.Option value="floral">Floral</Select.Option>
      <Select.Option value="woody">Woody</Select.Option>
      <Select.Option value="citrus">Citrus</Select.Option>
      <Select.Option value="aquatic">Aquatic</Select.Option>
    </Select>
  </Form.Item>

  {/* Longevity */}
  <Form.Item name="longevity" label="Longevity" rules={[{ required: true, message: 'Please select the longevity' }]}>
    <Select placeholder="Select Longevity">
      <Select.Option value="short">Short</Select.Option>
      <Select.Option value="moderate">Moderate</Select.Option>
      <Select.Option value="long-lasting">Long-lasting</Select.Option>
    </Select>
  </Form.Item>

  {/* Description */}
  <Form.Item name="description" label="Description" rules={[{ required: true, message: 'Please enter a description' }]}>
    <TextArea rows={3} placeholder="Product Description" />
  </Form.Item>

  {/* Stock */}
  <Form.Item name="stock" label="Stock" rules={[{ required: true, message: 'Please enter the stock quantity' }]}>
    <InputNumber min={0} placeholder="Stock Quantity" style={{ width: '100%' }} />
  </Form.Item>

  {/* Ingredients */}
  <Form.Item name="ingredients" label="Ingredients">
    <Select mode="tags" placeholder="Enter ingredients">
      <Select.Option value="alcohol">Alcohol</Select.Option>
      <Select.Option value="water">Water</Select.Option>
      {/* More ingredients can be added */}
    </Select>
  </Form.Item>

  {/* Seasons */}
  <Form.Item name="season" label="Recommended Season">
    <Select mode="tags" placeholder="Enter seasons (e.g., summer, winter)">
      <Select.Option value="summer">Summer</Select.Option>
      <Select.Option value="winter">Winter</Select.Option>
      <Select.Option value="spring">Spring</Select.Option>
      <Select.Option value="fall">Fall</Select.Option>
    </Select>
  </Form.Item>

  {/* Occasion */}
  <Form.Item name="occasion" label="Occasion">
    <Select mode="tags" placeholder="Enter occasions (e.g., casual, formal)">
      <Select.Option value="casual">Casual</Select.Option>
      <Select.Option value="formal">Formal</Select.Option>
    </Select>
  </Form.Item>

  {/* Concentration */}
  <Form.Item name="concentration" label="Concentration">
    <Select placeholder="Select concentration">
      <Select.Option value="parfum">Parfum</Select.Option>
      <Select.Option value="eau de parfum">Eau de Parfum</Select.Option>
      <Select.Option value="eau de toilette">Eau de Toilette</Select.Option>
      <Select.Option value="eau de cologne">Eau de Cologne</Select.Option>
    </Select>
  </Form.Item>

  {/* Best Seller */}
  <Form.Item name="bestSeller" valuePropName="checked">
    <Checkbox>Best Seller</Checkbox>
  </Form.Item>

  {/* Discontinued */}
  <Form.Item name="discontinued" valuePropName="checked">
    <Checkbox>Discontinued</Checkbox>
  </Form.Item>

  {/* Images */}
  <Form.Item label="Images">
    <Upload
      listType="picture"
      beforeUpload={() => false} // Prevent automatic upload
      multiple
    >
      <Button icon={<UploadOutlined />}>Upload Images</Button>
    </Upload>
  </Form.Item>
  
  {/* Image Preview and Delete */}
  <div className="mt-4 grid grid-cols-3 gap-4">
    {currentProduct?.images?.map((image) => (
      <div key={image.publicId} className="relative border w-20 h-20 ">
        <img src={image.imageUrl} alt="Uploaded" className="object-cover rounded-md" />
        <button
          type="button"
          onClick={() => handleDeleteImage(image.publicId)}
          className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-400 transition"
        >
          <FaTrashAlt />
        </button>
      </div>
    ))}
  </div>

        

          </>
          
        )}
        {selectedCategory === 'haircare' && (
          <>
             <Form.Item name="name" label="Product Name" rules={[{ required: true, message: 'Please enter the product name' }]}>
    <Input />
  </Form.Item>

  <Form.Item name="brand" label="Brand" rules={[{ required: true, message: 'Please enter the brand' }]}>
    <Input />
  </Form.Item>

  <Form.Item name="type" label="Type" rules={[{ required: true, message: 'Please select the type' }]}>
    <Select placeholder="Select product type">
      <Option value="shampoo">Shampoo</Option>
      <Option value="conditioner">Conditioner</Option>
      <Option value="styling gel">Styling Gel</Option>
      <Option value="treatment">Treatment</Option>
      <Option value="serum">Serum</Option>
      <Option value="mask">Mask</Option>
    </Select>
  </Form.Item>

  <Form.Item name="hairType" label="Hair Type">
    <Select placeholder="Select hair type">
      <Option value="straight">Straight</Option>
      <Option value="wavy">Wavy</Option>
      <Option value="curly">Curly</Option>
      <Option value="coily">Coily</Option>
      <Option value="all hair types">All Hair Types</Option>
    </Select>
  </Form.Item>

  <Form.List name="sizes">
    {(fields, { add, remove }) => (
      <>
        {fields.map(({ key, name, fieldKey, ...restField }) => (
          <div key={key} className="flex space-x-4">
            <Form.Item {...restField} name={[name, 'size']} label="Size" rules={[{ required: true, message: 'Please enter the size' }]}>
              <Input placeholder="e.g., 200ml, 16oz" />
            </Form.Item>
            <Form.Item {...restField} name={[name, 'price']} label="Price" rules={[{ required: true, message: 'Please enter the price' }]}>
              <InputNumber min={0} style={{ width: '100%' }} placeholder="e.g., 9.99" />
            </Form.Item>
            <Button type="danger" onClick={() => remove(name)} icon={<MinusCircleOutlined />} />
          </div>
        ))}
        <Form.Item>
          <Button type="dashed" onClick={() => add()} icon={<PlusOutlined />}>
            Add Size and Price
          </Button>
        </Form.Item>
      </>
    )}
  </Form.List>

  <Form.Item name="description" label="Description">
    <TextArea rows={4} />
  </Form.Item>

  <Form.Item name="stock" label="Stock">
    <InputNumber min={0} style={{ width: '100%' }} />
  </Form.Item>

  <Form.Item name="weight" label="Weight">
    <Input placeholder="e.g., 500g" />
  </Form.Item>

  <Form.Item name="usageInstructions" label="Usage Instructions">
    <TextArea rows={3} />
  </Form.Item>

  <Form.Item name="benefits" label="Benefits">
    <Select mode="tags" placeholder="Enter benefits">
      <Option value="moisturizes">Moisturizes</Option>
      <Option value="strengthens">Strengthens</Option>
      <Option value="smoothens">Smoothens</Option>
    </Select>
  </Form.Item>

  <Form.Item name="safetyWarnings" label="Safety Warnings">
    <TextArea rows={3} />
  </Form.Item>

  <Form.Item name="certifications" label="Certifications">
    <Select mode="tags" placeholder="Enter certifications">
      <Option value="Organic">Organic</Option>
      <Option value="Vegan">Vegan</Option>
      <Option value="Cruelty-Free">Cruelty-Free</Option>
    </Select>
  </Form.Item>

  <Form.Item name="skinSafe" valuePropName="checked">
    <Checkbox>Skin Safe</Checkbox>
  </Form.Item>

  <Form.Item name="suitableForChildren" valuePropName="checked">
    <Checkbox>Suitable for Children</Checkbox>
  </Form.Item>

  <Form.Item name="expirationDate" label="Expiration Date">
    <Input style={{ width: '100%' }} />
  </Form.Item>

  <Form.Item name={['discount', 'percentage']} label="Discount Percentage">
    <InputNumber min={0} max={100} style={{ width: '100%' }} />
  </Form.Item>

  <Form.Item name={['discount', 'validUntil']} label="Discount Valid Until">
    <Input style={{ width: '100%' }} />
  </Form.Item>

  {/* Images */}
  <Form.Item label="Product Images">
    <Upload
      listType="picture-card"
      // Upload logic goes here
    >
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    </Upload>
  </Form.Item>
  <div className="mt-4 grid grid-cols-3 gap-4">
    {currentProduct?.images?.map((image) => (
      <div key={image.publicId} className="relative border w-20 h-20">
        <img src={image.imageUrl} alt="Uploaded" className="object-cover rounded-md" />
        <button
          type="button"
          onClick={() => handleDeleteImage(image.publicId)}
          className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-400 transition"
        >
          <FaTrashAlt />
        </button>
      </div>
    ))}
  </div>

  <Form.Item name="isFeatured" valuePropName="checked">
    <Checkbox>Featured Product</Checkbox>
  </Form.Item>

  <Form.Item name="relatedProducts" label="Related Products">
    <Select mode="multiple" placeholder="Select related products">
      {/* Related products options fetched from the database */}
    </Select>
  </Form.Item>
          </>
          
        )}
        {selectedCategory === 'makeup' && (
          <>
            
        <Form.Item name="name" label="Product Name" rules={[{ required: true }]}>
    <Input />
  </Form.Item>

  {/* Brand */}
  <Form.Item name="brand" label="Brand" rules={[{ required: true }]}>
    <Input />
  </Form.Item>

  {/* Price and Size */}
  <Form.Item label="Size & Price">
    <Form.List name="sizes" initialValue={currentProduct?.sizes}>
      {(fields, { add, remove }) => (
        <>
          {fields.map((field) => (
            <div key={field.key} className="flex gap-4">
              <Form.Item {...field} name={[field.name, 'size']} label="Size" rules={[{ required: true }]}>
                <Input placeholder="Size (e.g., 50ml)" />
              </Form.Item>
              <Form.Item {...field} name={[field.name, 'price']} label="Price" rules={[{ required: true }]}>
                <InputNumber min={0} style={{ width: '100%' }} placeholder="Price" />
              </Form.Item>
              <Button type="danger" onClick={() => remove(field.name)}>
                Remove
              </Button>
            </div>
          ))}
          <Button type="dashed" onClick={() => add()}>
            Add Size
          </Button>
        </>
      )}
    </Form.List>
  </Form.Item>

  {/* Type */}
  <Form.Item name="type" label="Type" rules={[{ required: true }]}>
    <Select>
      <Select.Option value="foundation">Foundation</Select.Option>
      <Select.Option value="mascara">Mascara</Select.Option>
      <Select.Option value="lipstick">Lipstick</Select.Option>
      <Select.Option value="eyeshadow">Eyeshadow</Select.Option>
      <Select.Option value="blush">Blush</Select.Option>
      <Select.Option value="highlighter">Highlighter</Select.Option>
      <Select.Option value="concealer">Concealer</Select.Option>
    </Select>
  </Form.Item>

  {/* Shades */}
  <Form.Item name="shades" label="Shades">
    <Select mode="tags" placeholder="Enter shades" />
  </Form.Item>

  {/* Ingredients */}
  <Form.Item name="ingredients" label="Ingredients">
    <Select mode="tags" placeholder="Enter ingredients" />
  </Form.Item>

  {/* Finish */}
  <Form.Item name="finish" label="Finish">
    <Select>
      <Select.Option value="matte">Matte</Select.Option>
      <Select.Option value="satin">Satin</Select.Option>
      <Select.Option value="glossy">Glossy</Select.Option>
      <Select.Option value="dewy">Dewy</Select.Option>
      <Select.Option value="natural">Natural</Select.Option>
    </Select>
  </Form.Item>

  {/* Skin Type */}
  <Form.Item name="skinType" label="Skin Type">
    <Select>
      <Select.Option value="normal">Normal</Select.Option>
      <Select.Option value="dry">Dry</Select.Option>
      <Select.Option value="oily">Oily</Select.Option>
      <Select.Option value="combination">Combination</Select.Option>
      <Select.Option value="sensitive">Sensitive</Select.Option>
      <Select.Option value="all">All Skin Types</Select.Option>
    </Select>
  </Form.Item>

  {/* SPF */}
  <Form.Item name="SPF" label="SPF Protection">
    <InputNumber min={0} style={{ width: '100%' }} />
  </Form.Item>

  {/* Long-Wear */}
  <Form.Item name="longWear" valuePropName="checked">
    <Checkbox>Long-Wear</Checkbox>
  </Form.Item>

  {/* Waterproof */}
  <Form.Item name="waterproof" valuePropName="checked">
    <Checkbox>Waterproof</Checkbox>
  </Form.Item>

  {/* Cruelty-Free */}
  <Form.Item name="crueltyFree" valuePropName="checked">
    <Checkbox>Cruelty-Free</Checkbox>
  </Form.Item>

  {/* Vegan */}
  <Form.Item name="vegan" valuePropName="checked">
    <Checkbox>Vegan</Checkbox>
  </Form.Item>

  {/* Application Tips */}
  <Form.Item name="applicationTips" label="Application Tips">
    <Input.TextArea rows={3} />
  </Form.Item>

  {/* Benefits */}
  <Form.Item name="benefits" label="Benefits">
    <Select mode="tags" placeholder="Enter benefits" />
  </Form.Item>

  {/* Safety Warnings */}
  <Form.Item name="safetyWarnings" label="Safety Warnings">
    <Input.TextArea rows={3} />
  </Form.Item>

  {/* Expiration Date */}
  <Form.Item name="expirationDate" label="Expiration Date">
    <Input style={{ width: '100%' }} />
  </Form.Item>

  {/* Discount */}
  <Form.Item name={['discount', 'percentage']} label="Discount Percentage">
    <InputNumber min={0} max={100} style={{ width: '100%' }} />
  </Form.Item>

  <Form.Item name={['discount', 'validUntil']} label="Discount Valid Until">
    <Input style={{ width: '100%' }} />
  </Form.Item>

  {/* Is Featured */}
  <Form.Item name="isFeatured" valuePropName="checked">
    <Checkbox>Featured Product</Checkbox>
  </Form.Item>

  {/* Stock */}
  <Form.Item name="stock" label="Stock Quantity">
    <InputNumber min={0} style={{ width: '100%' }} />
  </Form.Item>

  {/* Description */}
  <Form.Item name="description" label="Description">
    <Input.TextArea rows={3} />
  </Form.Item>

  {/* Related Products */}
  <Form.Item name="relatedProducts" label="Related Products">
    <Select mode="multiple" placeholder="Select related products" />
  </Form.Item>

  {/* Upload Images */}
  <Form.Item name="images" label="Upload Images">
    <Upload action="/upload" listType="picture" multiple>
      <Button icon={<UploadOutlined />}>Upload Images</Button>
    </Upload>
  </Form.Item>

  {/* Display current images */}
  <div className="mt-4 grid grid-cols-3 gap-4">
    {currentProduct?.images?.map((image) => (
      <div key={image.publicId} className="relative border w-20 h-20">
        <img
          src={image.imageUrl}
          alt="Uploaded"
          className="object-cover rounded-md"
        />
        <button
          type="button"
          onClick={() => handleDeleteImage(image.publicId)}
          className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-400 transition"
        >
          <FaTrashAlt />
        </button>
      </div>
    ))}
  </div>
          </>
          
        )}
        

        

        {selectedCategory === 'nail' && (
            <>
                <Form.Item name="name" label="Product Name" rules={[{ required: true, message: 'Please enter the product name!' }]}>
  <Input />
</Form.Item>

<Form.Item name="brand" label="Brand" rules={[{ required: true, message: 'Please enter the brand name!' }]}>
  <Input />
</Form.Item>

<Form.Item name={['sizes', '0', 'size']} label="Size (e.g., 15ml)" rules={[{ required: true, message: 'Please enter the product size!' }]}>
  <Input />
</Form.Item>

<Form.Item name={['sizes', '0', 'price']} label="Price" rules={[{ required: true, message: 'Please enter the price for this size!' }]}>
  <InputNumber min={0} />
</Form.Item>

<Form.Item name="type" label="Product Type" rules={[{ required: true, message: 'Please select the product type!' }]}>
  <Select>
    <Option value="nail polish">Nail Polish</Option>
    <Option value="nail treatment">Nail Treatment</Option>
    <Option value="remover">Remover</Option>
    <Option value="top coat">Top Coat</Option>
    <Option value="base coat">Base Coat</Option>
  </Select>
</Form.Item>

<Form.Item name="colors" label="Available Colors">
  <Input placeholder="e.g. Red, Blue" />
</Form.Item>

<Form.Item name="ingredients" label="Ingredients">
  <Input placeholder="e.g. Acetone, Vitamin E" />
</Form.Item>

<Form.Item name="description" label="Description">
  <Input.TextArea rows={4} />
</Form.Item>

<Form.Item name="stock" label="Stock Quantity">
  <InputNumber min={0} />
</Form.Item>

<Form.Item name="finish" label="Finish">
  <Select>
    <Option value="matte">Matte</Option>
    <Option value="glossy">Glossy</Option>
    <Option value="shimmer">Shimmer</Option>
    <Option value="metallic">Metallic</Option>
  </Select>
</Form.Item>

<Form.Item name="nailType" label="Suitable Nail Types">
  <Select>
    <Option value="normal">Normal</Option>
    <Option value="weak">Weak</Option>
    <Option value="brittle">Brittle</Option>
    <Option value="dry">Dry</Option>
  </Select>
</Form.Item>

<Form.Item name="benefits" label="Benefits">
  <Input placeholder="e.g. Strengthening, Nourishing" />
</Form.Item>

<Form.Item name="dryingTime" label="Drying Time">
  <Input placeholder="e.g. 2 minutes" />
</Form.Item>

<Form.Item name="longLasting" valuePropName="checked" label="Long Lasting">
  <Checkbox />
</Form.Item>

<Form.Item name="chipResistant" valuePropName="checked" label="Chip Resistant">
  <Checkbox />
</Form.Item>

<Form.Item name="scent" label="Scent">
  <Input />
</Form.Item>

<Form.Item name="certifications" label="Certifications">
  <Input placeholder="e.g. Vegan, Cruelty-Free" />
</Form.Item>

<Form.Item name="isVegan" valuePropName="checked" label="Is Vegan">
  <Checkbox />
</Form.Item>

<Form.Item name="isCrueltyFree" valuePropName="checked" label="Is Cruelty-Free">
  <Checkbox />
</Form.Item>

<Form.Item name="expirationDate" label="Expiration Date">
  <Input format="MM-DD-YYYY" />
</Form.Item>

<Form.Item name="isFeatured" valuePropName="checked" label="Is Featured">
  <Checkbox />
</Form.Item>

<Form.Item name={['discount', 'percentage']} label="Discount Percentage">
  <InputNumber min={0} max={100} style={{ width: '100%' }} />
</Form.Item>

<Form.Item name={['discount', 'validUntil']} label="Discount Valid Until">
  <Input format="MM-DD-YYYY" style={{ width: '100%' }} />
</Form.Item>

<Form.Item name="relatedProducts" label="Related Products">
  <Input placeholder="IDs of related products" />
</Form.Item>

<Form.Item label="Upload Images">
  <Upload
    beforeUpload={() => false}
    multiple
  >
    <Button icon={<UploadOutlined />}>Upload Images</Button>
  </Upload>
</Form.Item>

<div className="mt-4 grid grid-cols-3 gap-4">
  {currentProduct?.images?.map((image) => (
    <div key={image.publicId} className="relative border w-20 h-20">
      <img
        src={image.imageUrl}
        alt="Uploaded"
        className="object-cover rounded-md"
      />
      <button
        type="button"
        onClick={() => handleDeleteImage(image.publicId)}
        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-400 transition"
      >
        <FaTrashAlt />
      </button>
    </div>
  ))}
</div>


            </>
        )}

        {selectedCategory === 'skincare' && (
            <>
                 <Form.Item
  name="name"
  label="Product Name"
  rules={[{ required: true, message: 'Please enter the product name!' }]}
>
  <Input />
</Form.Item>

<Form.Item
  name="brand"
  label="Brand Name"
  rules={[{ required: true, message: 'Please enter the brand name!' }]}
>
  <Input />
</Form.Item>

{/* Sizes and Price (as array of sizes) */}
<Form.List name="sizes">
  {(fields, { add, remove }) => (
    <>
      {fields.map(({ key, name, fieldKey, ...restField }) => (
        <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
          <Form.Item
            {...restField}
            name={[name, 'size']}
            fieldKey={[fieldKey, 'size']}
            label="Size"
            rules={[{ required: true, message: 'Missing size' }]}
          >
            <Input placeholder="Size (e.g., 100ml)" />
          </Form.Item>
          <Form.Item
            {...restField}
            name={[name, 'price']}
            fieldKey={[fieldKey, 'price']}
            label="Price"
            rules={[{ required: true, message: 'Missing price' }]}
          >
            <InputNumber min={0} placeholder="Price" />
          </Form.Item>
          <MinusCircleOutlined onClick={() => remove(name)} />
        </Space>
      ))}
      <Form.Item>
        <Button type="dashed" onClick={() => add()} block>
          Add Size & Price
        </Button>
      </Form.Item>
    </>
  )}
</Form.List>

{/* Product Type */}
<Form.Item
  name="type"
  label="Type"
  rules={[{ required: true, message: 'Please select a product type!' }]}
>
  <Select>
    <Option value="moisturizer">Moisturizer</Option>
    <Option value="cleanser">Cleanser</Option>
    <Option value="exfoliant">Exfoliant</Option>
    <Option value="serum">Serum</Option>
    <Option value="toner">Toner</Option>
    <Option value="sunscreen">Sunscreen</Option>
    <Option value="mask">Mask</Option>
  </Select>
</Form.Item>

{/* Skin Type */}
<Form.Item
  name="skinType"
  label="Skin Type"
>
  <Select>
    <Option value="normal">Normal</Option>
    <Option value="dry">Dry</Option>
    <Option value="oily">Oily</Option>
    <Option value="combination">Combination</Option>
    <Option value="sensitive">Sensitive</Option>
  </Select>
</Form.Item>

{/* Ingredients */}
<Form.Item
  name="ingredients"
  label="Ingredients"
>
  <Select mode="tags" placeholder="List ingredients">
    {/* Add common ingredient options */}
  </Select>
</Form.Item>

{/* Benefits */}
<Form.Item
  name="benefits"
  label="Benefits"
>
  <Select mode="tags" placeholder="List benefits">
    {/* Add common benefit options */}
  </Select>
</Form.Item>

{/* Texture */}
<Form.Item
  name="texture"
  label="Texture"
>
  <Input placeholder="Texture (e.g., cream, gel)" />
</Form.Item>

{/* Concerns */}
<Form.Item
  name="concerns"
  label="Concerns"
>
  <Select mode="multiple" allowClear>
    <Option value="acne">Acne</Option>
    <Option value="wrinkles">Wrinkles</Option>
    <Option value="dark spots">Dark Spots</Option>
    <Option value="redness">Redness</Option>
    <Option value="dullness">Dullness</Option>
    <Option value="pores">Pores</Option>
    <Option value="dryness">Dryness</Option>
  </Select>
</Form.Item>

{/* Certifications */}
<Form.Item
  name="certifications"
  label="Certifications"
>
  <Select mode="tags" placeholder="List certifications (e.g., Vegan, Cruelty-Free)">
  </Select>
</Form.Item>

{/* Stock */}
<Form.Item
  name="stock"
  label="Stock"
  rules={[{ required: true, message: 'Please enter stock quantity!' }]}
>
  <InputNumber min={0} />
</Form.Item>

{/* Suitable for Sensitive Skin */}
<Form.Item
  name="suitableForSensitiveSkin"
  valuePropName="checked"
>
  <Checkbox>Suitable for Sensitive Skin</Checkbox>
</Form.Item>

{/* SPF */}
<Form.Item
  name="spf"
  label="SPF"
>
  <InputNumber min={0} />
</Form.Item>

{/* Vegan and Cruelty-Free Flags */}
<Form.Item name="isVegan" valuePropName="checked">
  <Checkbox>Vegan</Checkbox>
</Form.Item>
<Form.Item name="isCrueltyFree" valuePropName="checked">
  <Checkbox>Cruelty-Free</Checkbox>
</Form.Item>
<Form.Item name="fragranceFree" valuePropName="checked">
  <Checkbox>Fragrance-Free</Checkbox>
</Form.Item>
<Form.Item name="parabenFree" valuePropName="checked">
  <Checkbox>Paraben-Free</Checkbox>
</Form.Item>

{/* Expiration Date */}
<Form.Item
  name="expirationDate"
  label="Expiration Date"
>
  <Input style={{ width: '100%' }} />
</Form.Item>

{/* Featured Product */}
<Form.Item
  name="isFeatured"
  valuePropName="checked"
>
  <Checkbox>Featured Product</Checkbox>
</Form.Item>

{/* Discount */}
<Form.Item name={['discount', 'percentage']} label="Discount Percentage">
  <InputNumber min={0} max={100} style={{ width: '100%' }} />
</Form.Item>
<Form.Item name={['discount', 'validUntil']} label="Discount Valid Until">
  <Input style={{ width: '100%' }} />
</Form.Item>

{/* Images */}
<div className="mt-4 grid grid-cols-4 gap-4">
  {currentProduct?.images?.map((image) => (
    <div key={image.publicId} className="relative border w-20 h-20">
      <img
        src={image.imageUrl}
        alt="Uploaded"
        className="object-cover rounded-md"
      />
      <button
        type="button"
        onClick={() => handleDeleteImage(image.publicId)}
        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-400 transition"
      >
        <FaTrashAlt />
      </button>
    </div>
  ))}
</div>

            </>
        )}

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ProductModal;

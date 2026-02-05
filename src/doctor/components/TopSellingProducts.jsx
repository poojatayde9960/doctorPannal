import React from 'react'
import { FaEdit, FaFilter, FaTrash } from "react-icons/fa";

const products = [
    {
        id: 1,
        model: "iPhone 14",
        category: "Smartphone",
        brand: "Apple",
        color: "Black",
        price: "$999",
        status: "1",
        image: "https://rukminim2.flixcart.com/image/832/832/ktketu80/mobile/z/h/v/iphone-13-pro-mlvq3hn-a-apple-original-imag6vpc6mx3zwhz.jpeg?q=70&crop=false",
    },
    {
        id: 2,
        model: "Galaxy S23",
        category: "Smartphone",
        brand: "Samsung",
        color: "Blue",
        price: "$899",
        status: "1",
        image: "https://rukminim2.flixcart.com/image/832/832/xif0q/mobile/q/k/h/-original-imagzm8qmr7qxfhq.jpeg?q=70&crop=false",
    },
    {
        id: 3,
        model: "iPhone 14",
        category: "Smartphone",
        brand: "Apple",
        color: "Black",
        price: "$999",
        status: "1",
        image: "https://rukminim2.flixcart.com/image/832/832/ktketu80/mobile/z/h/v/iphone-13-pro-mlvq3hn-a-apple-original-imag6vpc6mx3zwhz.jpeg?q=70&crop=false",
    },
    {
        id: 4,
        model: "Galaxy S23",
        category: "Smartphone",
        brand: "Samsung",
        color: "Blue",
        price: "$899",
        status: "1",
        image: "https://rukminim2.flixcart.com/image/832/832/xif0q/mobile/q/k/h/-original-imagzm8qmr7qxfhq.jpeg?q=70&crop=false",
    },
];

const TopSellingProducts = () => {
    return (
        <div className="overflow-x-auto bg-white p-6 shadow-md rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Top Selling Product List</h2>
            <table className="w-full border-collapse">
                <thead>
                    <tr className="border-b  text-gray-500 ">
                        <th className="p-3 text-left font-medium">Product</th>
                        <th className="p-3 text-left font-medium" >Category</th>
                        <th className="p-3 text-left font-medium">Brand</th>
                        <th className="p-3 text-left font-medium">Color</th>
                        <th className="p-3 text-left font-medium">Price</th>
                        <th className="p-3 text-left font-medium">Quantity</th>
                        <th className="p-3 text-left font-medium">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id} className="border-b hover:bg-gray-50">
                            <td className="p-3">
                                <div className="flex items-center gap-3">
                                    {/* Image Div */}
                                    <div className="w-14 h-14    flex items-center justify-center border border-gray-200 rounded-xl">
                                        <img src={product.image} alt={product.model} className="w-11 h-11 object-contain rounded" />
                                    </div>

                                    <div className="font-medium text-gray-700">
                                        {product.model}
                                    </div>
                                </div>
                            </td>

                            <td className="p-3">{product.category}</td>
                            <td className="p-3">{product.brand}</td>
                            <td className="p-3">{product.color}</td>
                            <td className="p-3 font-semibold">{product.price}</td>
                            <td className="p-3 text-center">{product.status}</td>
                            <td className="p-3 text-center ">
                                <div className="flex items-center justify-center gap-4">
                                    <button className="text-blue-500 hover:text-blue-700">
                                        <FaEdit />
                                    </button>
                                    <button className="text-red-500 hover:text-red-700">
                                        <FaTrash />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default TopSellingProducts
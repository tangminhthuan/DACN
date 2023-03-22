import React, {useState, useEffect, useCallback} from "react";

import Table from "../components/table/Table";
import "./products.css"
import productsService from "../services/ProductsService";
import {useTranslation} from "react-i18next";
import {Link} from "react-router-dom";

const customerTableHead = [
    {key: "number", label: "#"}, {key: "name", label: "products.name"},
    {key: "categoryNames", label: "products.categoryNames"},
    {key: "brandName", label: "products.brandName"},
    {key: "priceOld", label: "products.priceOld"},
    {key: "priceCurrent", label: "products.priceCurrent"},
    {key: "sale_off", label: "products.sale_off"},
    {key: "consumer", label: "products.consumer"},
    {key: "cotton", label: "products.cotton"},
    {key: "form", label: "products.form"},
    {key: "type", label: "products.type"},
    {key: "made_in", label: "products.made_in"},
    {key: "description", label: "products.description"}
];
const renderBody = (item, index) => {
    const {
        name, brandName, categoryNames, consumer, cotton, form, description, priceCurrent, priceOld, sale_off, type,made_in
    } = item;
    const category = categoryNames.map((item) => {
        return item + " "
    })
    return (<tr key={index}>
        <td>{index + 1}</td>
        <td>{name}</td>
        <td>{category}</td>
        <td>{brandName}</td>
        <td>{priceOld}</td>
        <td>{priceCurrent}</td>
        <td>{sale_off}</td>
        <td>{consumer}</td>
        <td>{cotton}</td>
        <td>{form}</td>
        <td>{type}</td>
        <td>{made_in}</td>
        <td>{description}</td>


    </tr>)

}


const Products = () => {
    const [productList, setProductList] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [pageSize, setPageSize] = useState(4);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [sortColumn, setSortColumn] = useState("name");
    const [sortOrder, setSortOrder] = useState('asc');
    useEffect(() => {
        const getUsers = async () => {
            setLoading(true);
            const response = await productsService.getAllProducts(currentPage, pageSize, searchTerm, sortOrder, sortColumn);
            const total = await productsService.getAllProducts(0, 1000, searchTerm, sortOrder, sortColumn);
            setProductList(response.data.results);
            setLoading(false);
            setTotalPages(Math.ceil(total.data.results.length / pageSize));

        };
        getUsers();
    }, [pageSize, currentPage, searchTerm, sortColumn, sortOrder]);
    const handlePageChange = useCallback((page) => {
        setCurrentPage(page ); //trừ 1 vì page bắt đầu từ 0
        console.log(page)
    }, []);
    const handleSort = useCallback((column) => {
        setSortColumn(column);
        if(sortOrder === 'asc'){
            setSortOrder('desc')
        }else {
            setSortOrder('asc')
        }
    }, [sortColumn, sortOrder]);
    const {t} = useTranslation();
    return (<div>
        <h2 className="page-header">
            {t('products.title')}
        </h2>
        <div className="row">
            <div className="col-12">

                <div className="card">
                    <div className="card__body">
                        <div className="user-register">
                            <button style={{
                                margin: "10px 0px",
                            }}>
                            <Link to="/addProduct">
                                <i className='bx bx-plus'></i>
                            </Link>
                            </button>
                        </div>
                        <div className="search-container">
                            <input
                                type="search"
                                placeholder="Tìm kiếm"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />

                        </div>
                        {loading ? <div>Loading...</div> : (
                            <Table
                            limit={pageSize}
                            headData={customerTableHead}
                            data={productList}
                            renderBody={(item, index) => renderBody(item, index)}
                            totalPages={totalPages}
                            currentPage={currentPage}
                            onChangePage={handlePageChange}
                            pageSize={pageSize}
                            sortColumn={sortColumn}
                            sortOrder={sortOrder}
                            onSort={handleSort}


                        />)}

                    </div>


                </div>
            </div>
        </div>
    </div>);
};

export default Products;

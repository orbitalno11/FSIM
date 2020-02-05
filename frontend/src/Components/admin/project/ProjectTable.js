
import React,{Component} from 'react'
import ProductRow from './ProjrctRow'


class ProjectTable extends Component {

    render() {
        let onProductTableUpdate = this.props.onProductTableUpdate;
        let rowDel = this.props.onRowDel;
        let rowAdd =this.props.onRowAdd;
        let product = this.props.products.map(function (product) {
            return (<ProductRow onProductTableUpdate={onProductTableUpdate} product={product} onDelEvent={rowDel.bind(this)} onAddEve={rowAdd}/>)
        });
        return (
            <React.Fragment>
                    {product} 
            </React.Fragment>
        );

    }

}

export default ProjectTable;
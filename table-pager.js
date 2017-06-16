import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import ReactPaginate from 'react-paginate'
import Table from 'app/js/components/base/table'
import axios from 'axios'

const MARGIN_PAGES_DISPLAYED = 2
const PAGE_RANGE_DISPLAYED = 4

/**
 * [state description]
 * @type {Object}
 */

class TablePager extends Component {
    constructor (props) {
        super(props)
        this.state = {
            offset: 0
        }
    }

    componentWillReceiveProps (nextProps) {
        let { offset } = nextProps
        if (typeof offset !== 'undefined') {
            this.setState({
                offset
            })
        }
    }

    componentWillMount () {
        let { offset } = this.props
        if (typeof offset !== 'undefined') {
            this.setState({
                offset
            })
        }
    }

    handlePageClick = data => {
        let selected = data.selected
        let { onPageChange } = this.props
        if (typeof onPageChange === 'function') {
            onPageChange(data)
        } else {
            let offset = Math.ceil(selected * this.props.pageSize)
            this.setState({ offset })
        }
    }

    newPageData = () => {
        let finalData = []
        for (
            let i = this.state.offset;
            i <
            Math.min(
                this.state.offset + this.props.pageSize,
                this.props.data.length
            );
            i++
        ) {
            finalData.push(this.props.data[i])
        }
        return finalData
    }

    render () {
        let { totalCount } = this.props
        if (typeof totalCount === 'undefined') {
            totalCount = this.props.data.length
        }
        const pageCount = Math.ceil(totalCount / this.props.pageSize)

        return (
            <div>
                <Table
                    headers={this.props.headers}
                    data={this.newPageData()}
                    fixed={this.props.fixed}
                />
                {pageCount > 1
                    ? <ReactPaginate
                          previousLabel={<i className='fl-chevron-left' />}
                          nextLabel={<i className='fl-chevron-right' />}
                          breakLabel={<p>...</p>}
                          breakClassName={'pagination__break-me'}
                          pageCount={pageCount}
                          marginPagesDisplayed={MARGIN_PAGES_DISPLAYED}
                          pageRangeDisplayed={PAGE_RANGE_DISPLAYED}
                          onPageChange={this.handlePageClick}
                          containerClassName={'pagination'}
                          subContainerClassName={'pages_pagination'}
                          activeClassName={'pagination__page--active'}
                          previousClassName={'pagination__previous'}
                          nextClassName={'pagination__next'}
                          disabledClassName={'is-disabled'}
                          pageClassName={'pagination__page'}
                          pageLinkClassName={'pagination__page__link'}
                          previousLinkClassName={'pagination__previous__link'}
                          nextLinkClassName={'pagination__next__link'}
                          initialPage={this.props.initialPage}
                          disableInitialCallback={this.props.disableInitialCallback}
                      />
                    : null}
            </div>
        )
    }
}

export default TablePager

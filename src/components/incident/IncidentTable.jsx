import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
  useRef,
  useReducer,
} from 'react';
import { Route, withRouter, Redirect, Link } from 'react-router-dom';
import {
  Grid,
  Segment,
  Container,
  Icon,
  Table,
  Visibility,
} from 'semantic-ui-react';
import IncidentApi from './Api';
import useAsync from '../common/hoc/useAsync';
import { INCIDENT_TYPE, STATUS_COLOR } from './constants';
import Loader from '../common/Loader';

const TABLE_SORT_ICON = {
  asc: 'ascending',
  desc: 'descending',
};

const TABLEDATA = [
  {
    id: '60aafe3079d3ae59ecc71c6b',
    created_by: 'admin',
    description: 'desc text',
    status: 'analysis',
    title: 'updating  incident',
    assignee: 'user1',
    acknowledge: 'false',
    type: 'bug',
    updated_on: '2021-05-24T03:27:26.369Z',
    created_on: '2021-05-24T01:15:28.283Z',
  },
  {
    id: '60aa5c4dd69b37127c5c746c',
    created_by: 'admin',
    description: '',
    status: 'analysis',
    title: '2nd incident',
    assignee: 'user1',
    acknowledge: 'false',
    type: 'bug',
    updated_on: '2021-05-23T13:44:45.615Z',
    created_on: '2021-05-23T13:44:45.615Z',
  },
  {
    id: '60aa4a48803ccc36e436ef42',
    created_by: 'admin',
    description: '',
    status: 'analysis',
    title: '1st incident',
    assignee: '',
    acknowledge: 'false',
    type: 'bug',
    updated_on: '2021-05-23T12:27:52.151Z',
    created_on: '2021-05-23T12:27:52.151Z',
  },
  {
    id: '60aa4921cf08e61568e3521e',
    created_by: 'admin',
    description: '',
    status: 'analysis',
    title: '1st incident',
    assignee: '',
    acknowledge: 'false',
    type: 'bug',
    updated_on: '2021-05-23T12:22:57.360Z',
    created_on: '2021-05-23T12:22:57.360Z',
  },
  {
    created_by: 'admin',
    description: '',
    status: 'analysis',
    title: '1st incident',
    assignee: '',
    acknowledge: 'false',
    type: 'bug',
    updated_on: '2021-05-23T10:07:47.506Z',
    created_on: '2021-05-23T10:07:47.506Z',
  },
];
const IncidentTable = (props) => {
  const { history, reloadTable } = props;
  const DefaultProps = {
    max: 5,
    start_index: 0,
    filterby: [],
    sortby: 'created_on',
    orderby: 'desc',
  };

  console.log('table demo ', props);
  const TableRef = useRef();

  const { fetch, loading, data, reset, error } = useAsync();
  const [apiFilter, setApiFilter] = useState(DefaultProps);
  const [apiTriggered, setApiTriggered] = useState(false);
  const [tableData, setTableData] = useState({});
  const [sorting, setSorting] = useState({ direction: null, column: null });

  const constructTableData = (list = [], newFetch = false) => {
    const { data: previousData = [] } = tableData;
    const tblData = newFetch ? list : [...previousData, ...list];
    setTableData({
      data: tblData,
    });
  };

  const fetchTableData = (newFilter = {}, newFetch = false) => {
    const params = {
      ...DefaultProps,
      ...newFilter,
    };
    if (!apiTriggered) {
      fetch(
        IncidentApi.getIncidentList(params)
          .then((res) => {
            console.log('table response ', res, tableData, sorting);
            constructTableData(res, newFetch);
          })
          .then(() => setApiTriggered(false)),
      );
    }
  };
  useEffect(() => {
    fetchTableData();
  }, []);

  useEffect(() => {
    if (reloadTable) fetchTableData({}, true);
  }, [reloadTable]);

  useEffect(() => {
    console.log('sorting useEffect   ', sorting);
  }, [sorting]);

  const setFilter = (sortby) => {
    const { direction } = sorting;
    const orderby = direction === 'asc' ? 'desc' : 'asc';

    console.log('setFilter ', sorting);
    setSorting({ column: sortby, direction: orderby });
    // resetTable();
    fetchTableData({ sortby, orderby }, true);
  };

  const handleUpdate = (e, { calculations }) => {
    const { direction, bottomVisible, topVisible } = calculations;
    if (
      direction === 'down' &&
      !topVisible &&
      bottomVisible &&
      !loading &&
      !error
    ) {
      fetchTableData({
        start_index: tableData.data.length,
      });
    }
  };

  const showTableRows = () =>
    tableData?.data?.map(
      (
        { type, status, id, title, created_by: createdBy, assignee, ...rest },
        index,
      ) => (
        <Table.Row
          key={id}
          id={id}
          ref={TableRef}
          onClick={(e, x) =>
            history.push(`/incident/${e.target.parentNode.id}`)
          }
        >
          <Table.Cell>{type.toUpperCase()}</Table.Cell>
          <Table.Cell
            style={{
              color: STATUS_COLOR[status.toUpperCase()],
            }}
          >
            {status.toUpperCase()}
          </Table.Cell>
          <Table.Cell
            style={{
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
            }}
            title={title}
          >
            <span>{title}</span>
          </Table.Cell>
          <Table.Cell>{createdBy}</Table.Cell>
          <Table.Cell>{assignee}</Table.Cell>
        </Table.Row>
      ),
    );
  console.log('table error ', error);
  return (
    <Visibility fireOnMount onUpdate={handleUpdate}>
      <Table sortable celled fixed selectable ref={TableRef}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell
              sorted={
                sorting.column === 'type'
                  ? TABLE_SORT_ICON[sorting.direction]
                  : null
              }
              onClick={() => setFilter('type')}
            >
              Type
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={
                sorting.column === 'status'
                  ? TABLE_SORT_ICON[sorting.direction]
                  : null
              }
              onClick={() => setFilter('status')}
            >
              status
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={
                sorting.column === 'title'
                  ? TABLE_SORT_ICON[sorting.direction]
                  : null
              }
              onClick={() => setFilter('title')}
            >
              Title
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={
                sorting.column === 'created_by'
                  ? TABLE_SORT_ICON[sorting.direction]
                  : null
              }
              onClick={() => setFilter('created_by')}
            >
              Created By
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={
                sorting.column === 'assignee'
                  ? TABLE_SORT_ICON[sorting.direction]
                  : null
              }
              onClick={() => setFilter('assignee')}
            >
              Assignee
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>{!loading && !error && showTableRows()}</Table.Body>
      </Table>
      {loading && <Loader />}
      {error && <span>Error in fetching Incident List</span>}
    </Visibility>
  );
};

export default withRouter(IncidentTable);

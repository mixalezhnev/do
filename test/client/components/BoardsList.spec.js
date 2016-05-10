import React from 'react';
import sinon from 'sinon';
import _ from 'lodash';
import { shallow } from 'enzyme';
import { assert } from 'chai';
import BoardsList from 'client/components/BoardsList';

const setup = (customProps = {}) => {
    const props = _.assign({}, {
        boards: [
            { id: 1, title: 'board 1' },
            { id: 2, title: 'board 2' }
        ],
        onAddBoardBtnClick: sinon.spy(),
        onBoardTileRemoveClick: sinon.spy()
    }, customProps);
    const component = shallow(<BoardsList {...props} />);

    return {
        boardTiles: component.find('BoardTile'),
        component,
        props
    };
};

describe('<BoardsList />', () => {
    it('should render boards', () => {
        const { props, boardTiles } = setup();

        assert.equal(boardTiles.length, 2);
    });

    it('should pass board data to <BoardTile />', () => {
        const { props, boardTiles } = setup();

        props.boards.forEach((board, i) => {
            assert.equal(boardTiles.at(i).props().id, board.id);
            assert.equal(boardTiles.at(i).props().title, board.title);
        });
    });

    it('should pass `onBoardTileRemoveClick` callback to <BoardTile /> onRemoveClick prop', () => {
        const { props, boardTiles } = setup();

        boardTiles.at(0).props().onRemoveClick();
        assert.equal(props.onBoardTileRemoveClick.callCount, 1);
    });
});

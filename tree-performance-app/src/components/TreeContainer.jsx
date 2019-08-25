import React, { Component } from 'react';
import { constructTree } from '../toolbelt';
import Tree, { renderers } from 'react-virtualized-tree';
import 'react-virtualized/styles.css'
import 'react-virtualized-tree/lib/main.css'
import 'material-icons/css/material-icons.css'
const { Expandable, Favorite } = renderers;

const MAX_DEEPNESS = 3;
const MAX_NUMBER_OF_CHILDREN = 200;
const MIN_NUMBER_OF_PARENTS = 5;

const Nodes = constructTree(MAX_DEEPNESS, MAX_NUMBER_OF_CHILDREN, MIN_NUMBER_OF_PARENTS);

const EXPANDED = 'ALL';

class TreeContainer extends Component {
    state = {
        nodes: Nodes,
        selectedGroup: EXPANDED,
        groupsEnabled: true,
    };

    handleChange = nodes => {
        this.setState({ nodes });
    };

    handleSelectedGroupChange = selectedGroup => {
        this.setState({ selectedGroup });
    };

    handleGroupsToogle = () => {
        this.setState({ groupsEnabled: !this.state.groupsEnabled });
    };

    render() {
        return (
            <div>
                <div style={{ height: 500 }}>
                    <Tree nodes={this.state.nodes} onChange={this.handleChange}>
                        {({ style, node, ...rest }) => (
                            <div style={style}>
                                <Expandable node={node} {...rest}>
                                    <Favorite node={node} {...rest}>
                                        {node.name}
                                    </Favorite>
                                </Expandable>
                            </div>
                        )}
                    </Tree>
                </div>

            </div>
        );
    }
}
export { TreeContainer }
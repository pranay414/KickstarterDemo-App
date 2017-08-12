import React, { Component } from 'react';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Text, Item, Input, Card, CardItem, List } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';
import api from '../utils/api';

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            projects: [],
            search: ''
        }
    }

    componentWillMount() {
        api.getCampaigns().then((res) => {
            this.setState({
                projects: res,
            })
        })
    }

    updateSearch(event) {
        this.setState({ search: event.target.value.substr(0, 20) })
    }

    render() {

        return (
            <Container>
                <Header searchBar rounded>
                    <Item>
                        <Icon name="magnify" size={24} />
                        <Input placeholder="Search by name" value={this.state.search} onChange={this.updateSearch.bind(this)} />
                    </Item>
                    <Right>
                        <Button transparent onPress={()=>{}}>
                            <Icon name="sort" size={24} color="#ffffff" />
                        </Button>
                        <Button transparent>
                            <Icon name="filter" size={24} color="#ffffff" />
                        </Button>
                    </Right>
                </Header>
                <Content>
                    <List dataArray={this.state.projects.filter((project) => {
                            return project.title.indexOf(this.state.search) !== -1
                        })}
                        renderRow={(project) =>
                            <Card>
                                <CardItem header bordered={true}>
                                    <Text>{project.title}</Text>
                                </CardItem>
                                <CardItem>
                                    <Body>
                                        <Text>
                                            Pledge: ${project["amt.pledged"]}
                                        </Text>
                                        <Text style={{ paddingTop: 10 }}>
                                            Backers: {project["num.backers"]}
                                        </Text>
                                        <Text style={{ paddingTop: 25 }}>
                                            Number of days to go: {moment(project["end.time"]).format('MM/DD/YYYY')}
                                        </Text>
                                    </Body>
                                </CardItem>
                            </Card>
                        }>
                    </List>
                </Content>
            </Container>
        );
    }
}
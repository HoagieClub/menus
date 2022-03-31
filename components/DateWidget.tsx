import React, { Component, Fragment } from 'react';
import { Pane, Card, Heading, Text, majorScale, IconButton, ChevronLeftIcon, ChevronRightIcon} from "evergreen-ui";

const meals = ['Breakfast', 'Lunch', 'Dinner'];
const weekendMeals = ['Brunch', 'Dinner'];
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 
                'Saturday'];

interface MyState {
    windowWidth: number,
    currentMealIndex: number, 
    month: number,
    date: number,
    dayIndex: number,
    year: number,
}

class DateWidget extends Component<{}, MyState> {
    constructor(props) {
        super(props);
        const today = new Date();
        const currentHour = today.getHours();
        let currentMealIndex = 0;
        if (currentHour <= 11) currentMealIndex = 0;
        else if (currentHour <= 2) currentMealIndex = 1;
        else currentMealIndex = 2;
        this.state = {
            windowWidth: window.innerWidth,
            currentMealIndex: currentMealIndex,
            month: today.getMonth() + 1,
            date: today.getDate(),
            dayIndex: today.getDay(),
            year: today.getFullYear()
        }
    }

    handleResize = () => {
        this.setState({windowWidth: window.innerWidth});
    }
    
    componentDidMount() {
        window.addEventListener('resize', this.handleResize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
    }

    moveMealLeft = () => {
        let index = this.state.currentMealIndex;

        if (index > 0) {
            this.setState({
                currentMealIndex: index - 1
            });
        }
        else {
            let oldDate = new Date(this.state.year, this.state.month - 1, this.state.date);
            let newDate = new Date(oldDate.getTime() - 20*60*60*1000);
            if (oldDate < new Date()) 
                return;
            if (days[this.state.dayIndex] == 'Sunday' || days[this.state.dayIndex] == 'Monday') {
                this.setState({
                    currentMealIndex: 1,
                    month: newDate.getMonth() + 1,
                    date: newDate.getDate(),
                    dayIndex: newDate.getDay(),
                    year: newDate.getFullYear()
                });
            }
            else {
                this.setState({
                    currentMealIndex: 2,
                    month: newDate.getMonth() + 1,
                    date: newDate.getDate(),
                    dayIndex: newDate.getDay(),
                    year: newDate.getFullYear()
                });
            }
        }
    }

    moveMealRight = () => {
        let index = this.state.currentMealIndex;
        if (index < 2) {
            if (index == 1 && (days[this.state.dayIndex] == 'Saturday' || days[this.state.dayIndex] == 'Sunday')) {
                let oldDate = new Date(this.state.year, this.state.month - 1, this.state.date);
                let newDate = new Date(oldDate.getTime() + 24*60*60*1000);
                if (oldDate > new Date(new Date().getTime() + 24*60*60*1000 * 5)) 
                    return;
                this.setState({
                    currentMealIndex: 0,
                    month: newDate.getMonth() + 1,
                    date: newDate.getDate(),
                    dayIndex: newDate.getDay(),
                    year: newDate.getFullYear()
                });
            }
            else {
                this.setState({
                    currentMealIndex: index + 1
                });
            }
            
        }
        else {
            let oldDate = new Date(this.state.year, this.state.month - 1, this.state.date);
            let newDate = new Date(oldDate.getTime() + 24*60*60*1000);
            if (oldDate > new Date(new Date().getTime() + 24*60*60*1000 * 5)) 
                return;
            this.setState({
                currentMealIndex: 0,
                month: newDate.getMonth() + 1,
                date: newDate.getDate(),
                dayIndex: newDate.getDay(),
                year: newDate.getFullYear()
            });
        }
    }

    render() {
        return (  
        <Fragment>
            { this.state.windowWidth >= 1328 &&
            (<Card 
            background="gray50" borderRadius={8}
            padding={16}
            marginY={majorScale(4)} minWidth={1248}
            height={88}
            display="flex">
                <Pane flex={1} alignItems="center" display="flex">
                {(days[this.state.dayIndex] != 'Saturday' && days[this.state.dayIndex] != 'Sunday') && (<Heading is="h1" fontSize={35} marginLeft={majorScale(2)}>
                        {meals[this.state.currentMealIndex]}
                    </Heading>)
                }
                {(days[this.state.dayIndex] == 'Saturday' || days[this.state.dayIndex] == 'Sunday') && (<Heading is="h1" fontSize={35} marginLeft={majorScale(2)}>
                        {weekendMeals[this.state.currentMealIndex]}
                    </Heading>)
                }
                </Pane>
                <Pane marginRight={majorScale(2)} marginTop={majorScale(2)} >
                    <Text fontSize={20} marginRight={majorScale(5)}>
                        {days[this.state.dayIndex]}, {this.state.month}/{this.state.date}
                    </Text>
                    <IconButton icon={ChevronLeftIcon} marginRight={majorScale(5)} onClick={this.moveMealLeft} />
                    <IconButton icon={ChevronRightIcon} onClick={this.moveMealRight} />
                </Pane>
            </Card>)}


            { this.state.windowWidth >= 1008 &&
            this.state.windowWidth < 1328 &&
            (<Card 
            background="gray50" borderRadius={8}
            padding={16}
            marginY={majorScale(4)} minWidth={928}
            height={88}
            display="flex">
                <Pane flex={1} alignItems="center" display="flex">
                    {(days[this.state.dayIndex] != 'Saturday' && days[this.state.dayIndex] != 'Sunday') && (<Heading is="h1" fontSize={35} marginLeft={majorScale(2)}>
                            {meals[this.state.currentMealIndex]}
                        </Heading>)
                    }
                    {(days[this.state.dayIndex] == 'Saturday' || days[this.state.dayIndex] == 'Sunday') && (<Heading is="h1" fontSize={35} marginLeft={majorScale(2)}>
                            {weekendMeals[this.state.currentMealIndex]}
                        </Heading>)
                    }
                </Pane>
                <Pane marginRight={majorScale(2)} marginTop={majorScale(2)} >
                    <Text fontSize={20} marginRight={majorScale(5)}>
                        {days[this.state.dayIndex]}, {this.state.month}/{this.state.date}
                    </Text>
                    <IconButton icon={ChevronLeftIcon} marginRight={majorScale(5)} onClick={this.moveMealLeft} />
                    <IconButton icon={ChevronRightIcon} onClick={this.moveMealRight} />
                </Pane>
            </Card>)}


            { this.state.windowWidth < 1008 &&
            this.state.windowWidth >= 688 && 
            (<Card 
            background="gray50" borderRadius={8}
            padding={16}
            marginY={majorScale(4)} minWidth={608}
            height={88}
            display="flex">
                <Pane flex={1} alignItems="center" display="flex">
                    {(days[this.state.dayIndex] != 'Saturday' && days[this.state.dayIndex] != 'Sunday') && (<Heading is="h1" fontSize={35} marginLeft={majorScale(2)}>
                            {meals[this.state.currentMealIndex]}
                        </Heading>)
                    }
                    {(days[this.state.dayIndex] == 'Saturday' || days[this.state.dayIndex] == 'Sunday') && (<Heading is="h1" fontSize={35} marginLeft={majorScale(2)}>
                            {weekendMeals[this.state.currentMealIndex]}
                        </Heading>)
                    }
                </Pane>
                <Pane marginRight={majorScale(2)} marginTop={majorScale(2)} >
                    <Text fontSize={20} marginRight={majorScale(5)}>
                        {days[this.state.dayIndex]}, {this.state.month}/{this.state.date}
                    </Text>
                    <IconButton icon={ChevronLeftIcon} marginRight={majorScale(5)} onClick={this.moveMealLeft} />
                    <IconButton icon={ChevronRightIcon} onClick={this.moveMealRight} />
                </Pane>
            </Card>)}

            { this.state.windowWidth < 688 &&
            (<Card 
            background="gray50" borderRadius={8}
            padding={16}
            marginY={majorScale(4)} minWidth='90%'
            height={88}
            display="flex">
                <Pane flex={1} alignItems="center" display="flex">
                    {(days[this.state.dayIndex] != 'Saturday' && days[this.state.dayIndex] != 'Sunday') && (<Heading is="h1" fontSize={35} marginLeft={majorScale(2)}>
                            {meals[this.state.currentMealIndex]}
                        </Heading>)
                    }
                    {(days[this.state.dayIndex] == 'Saturday' || days[this.state.dayIndex] == 'Sunday') && (<Heading is="h1" fontSize={35} marginLeft={majorScale(2)}>
                            {weekendMeals[this.state.currentMealIndex]}
                        </Heading>)
                    }
                </Pane>
                <Pane marginRight={majorScale(2)} marginTop={majorScale(2)} >
                    <Text fontSize={20} marginRight={majorScale(2)}>
                        {days[this.state.dayIndex]}, {this.state.month}/{this.state.date}
                    </Text>
                    <IconButton icon={ChevronLeftIcon} marginRight={majorScale(2)} onClick={this.moveMealLeft} />
                    <IconButton icon={ChevronRightIcon} onClick={this.moveMealRight} />
                </Pane>
            </Card>)}


        </Fragment>          
        );
    }
}


export default DateWidget;
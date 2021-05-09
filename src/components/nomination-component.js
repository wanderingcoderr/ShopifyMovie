import {Card, EmptyState} from '@shopify/polaris';

const NominationComponent = (props) => {
    
    console.log(props.data);
    return (<Card title="Nominated List">
        {props.data.length > 0 ?  props.data.map((element,index) => {
            let number = index + 1;
            let title = `Nomination ${number}`
            return(<Card.Section title={title} actions={[{content: 'Remove', onAction: () => props.removeNomination(element.imdbID)}]}>
            <h3>{element.Year} - {element.Title}</h3>
            </Card.Section>)
        }) : (<EmptyState
            heading="No Nominations Yet"
            image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
          >
            <p>Search and nominate movies</p>
          </EmptyState>)}
       
  </Card>)
}

export default NominationComponent;
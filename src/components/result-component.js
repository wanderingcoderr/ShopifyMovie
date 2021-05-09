
import { Card,ResourceList,Avatar,TextStyle, Button} from '@shopify/polaris';

const ResultComponent = (props) => {
    const resourceName = {
        singular: 'movie',
        plural: 'movies',
      };

    
    return(<Card>
        <ResourceList
          showHeader
          resourceName={resourceName}
          items={props.data}
          loading={props.loading}
          renderItem={(item) => {
            const {Title, Year, imdbID , nominated} = item;
            // const media = <Avatar customer size="medium" name={name} />;
  
            return (
              <ResourceList.Item>
                <h3 style={{display:'inline-block'}} title={Title}>
                  <TextStyle variation="strong">{Year} - {Title} </TextStyle>
                </h3>
                <div style={{float:"right"}}>
                    <Button primary size="slim" onClick={() => props.nominate(imdbID)} disabled={nominated ? true:false}>Nominate</Button>
                </div>
              </ResourceList.Item>
            );
          }}
        />
      </Card>)
}

export default ResultComponent;
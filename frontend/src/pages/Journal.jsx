import { Card, CardBody, Typography, Button } from "@material-tailwind/react";

function Journal() {
  return (
    <>
      <Card className="mt-6 w-1/2 mx-auto">
        <CardBody>
          <Typography variant="h5" color="blue-gray" className="mb-2">
            Journal
          </Typography>
        </CardBody>
      </Card>
    </>
  );
}

export default Journal;

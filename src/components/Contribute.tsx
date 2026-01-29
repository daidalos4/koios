import { Button, Card, CardContent, CardDescription, CardTitle } from "./ui";

const Contribute = () => {
  return (
    <Card className="w-full">
      <CardContent className="flex flex-col gap-4 p-4 py-0 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2 md:max-w-[70%]">
          <CardTitle className="text-xs lg:text-sm">
            Contribute to Koios
          </CardTitle>
          <CardDescription className="text-[10px] lg:text-xs">
            Koios is free and open source. Help us improve by contributing code,
            reporting bugs, or suggesting features on GitHub.
          </CardDescription>
        </div>
        <Button asChild className="w-full md:w-auto text-[10px] lg:text-xs">
          <a
            href="https://github.com/adrbn/koios"
            rel="noopener noreferrer"
            target="_blank"
          >
            View on GitHub
          </a>
        </Button>
      </CardContent>
    </Card>
  );
};

export default Contribute;

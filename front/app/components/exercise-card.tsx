// @ts-nocheck
import { ArrowLeftRight, ArrowUpNarrowWide, BicepsFlexedIcon, LucideDumbbell, Signal } from 'lucide-react';
import { Card, CardContent, CardDescription } from '~/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '~/components/ui/carousel';
import { EQUIPMENT, EXERCISE_MECHANIC, FITNESS_LEVEL, MUSCLE, TRAINING_FOCUS, TRAINING_PHASE } from '~/lib/enums';
import { ExerciseFormatType } from '~/lib/types';
import { Badge } from './ui/badge';
import { TypographyLi, TypographyP } from './ui/typography';

const ExerciseCard = ({ exercise }: { exercise: ExerciseFormatType }) => {
    const {
        id,
        name,
        focus,
        plane_of_motion,
        secondary_muscles,
        equipment,
        exercise_mechanic,
        primary_muscles,
        stabilizer_muscles,
        appropriate_training_phases,
        appropriate_fitness_level,
        images,
        instructions,
        video,
        createdAt,
        updatedAt,
    } = exercise;

    return (
        <Card className="rounded-md h-full p-2">
            <CardContent className="flex flex-col gap-3 p-2">
                {/* image */}
                <Carousel className="w-fit h-fit">
                    <CarouselContent>
                        {images.map((image) => (
                            <CarouselItem key={image} className="w-full">
                                <img className="rounded-md sm:aspect-video aspect-square " src={`/exercises/${image}`} alt={image} />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="left-[10px]" />
                    <CarouselNext className="right-[10px]" />
                </Carousel>

                {/* details */}
                <div className=" flex flex-col gap-2">
                    {/* - */}
                    <Badge className="text-sm">{TRAINING_FOCUS[focus]}</Badge>
                    <TypographyP className="capitalize mb-1">{name}</TypographyP>

                    {/* 1 row */}
                </div>

                <div className=" flex flex-col gap-1">
                    <div className="flex items-center gap-1">
                        <BicepsFlexedIcon className="w-6 h-6 p-0.5 bg-red-700 text-white rounded-full" />
                        <TypographyP className="text-sm">{primary_muscles.map((item) => MUSCLE[item]).join(',')}</TypographyP>
                    </div>
                    {/* 1 row */}
                    <div className="flex items-center gap-1">
                        <BicepsFlexedIcon className="w-6 h-6 p-0.5 bg-red-200 text-primary rounded-full" />
                        <TypographyP className="text-sm">{secondary_muscles.map((item) => MUSCLE[item]).join(', ')}</TypographyP>
                    </div>
                </div>
                {/* 1 row */}
                <div className=" flex flex-col gap-1">
                    <div className="flex items-center gap-1">
                        <LucideDumbbell className="w-6 h-6 p-0.5 bg-primary text-secondary rounded-full" />
                        <TypographyP className="text-sm">{EQUIPMENT[equipment]}</TypographyP>
                    </div>
                    {/* 1 row */}
                    <div className="flex items-center gap-1">
                        <ArrowLeftRight className="w-6 h-6 p-0.5 bg-primary text-secondary rounded-full" />
                        <TypographyP className="text-sm">{EXERCISE_MECHANIC[exercise_mechanic]}</TypographyP>
                    </div>
                    {/* 1 row */}
                    <div className="flex items-center gap-1">
                        <Signal className="w-6 h-6 p-0.5 bg-primary text-secondary rounded-full" />
                        <TypographyP className="text-sm">{FITNESS_LEVEL[appropriate_fitness_level]}</TypographyP>
                    </div>
                    {/* 1 row */}
                    <div className="flex items-center gap-1">
                        <ArrowUpNarrowWide className="w-6 h-6 p-0.5 bg-primary text-secondary rounded-full" />
                        <TypographyP className="text-sm">
                            {appropriate_training_phases.map((item) => (
                                <>
                                    {TRAINING_PHASE[item]}
                                    <br />
                                </>
                            ))}
                        </TypographyP>
                    </div>
                </div>

                <CardDescription>
                    <ul className="flex flex-col gap-3">
                        {instructions.map((instruction) => (
                            <TypographyLi key={instruction}>{instruction}</TypographyLi>
                        ))}
                    </ul>
                </CardDescription>
            </CardContent>
        </Card>
    );
};

export default ExerciseCard;

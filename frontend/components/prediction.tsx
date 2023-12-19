"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField } from "./ui/form";
import { ControlledInput } from "./ui/input";
import { ControlledCombobox } from "./ui/combobox";
import { Button } from "./ui/button";
import { useState } from "react";

const FormSchema = z.object({
  temperature: z.coerce
    .number({ required_error: "This field is required" })
    .min(0, { message: "This field must not be smaller than 0" }),
  humidity: z.coerce
    .number({ required_error: "This field is required" })
    .min(0, { message: "This field must not be smaller than 0" }),
  light: z.coerce
    .number({ required_error: "This field is required" })
    .min(0, { message: "This field must not be smaller than 0" }),
  co2: z.coerce
    .number({ required_error: "This field is required" })
    .min(0, { message: "This field must not be smaller than 0" }),
  humidityRatio: z.coerce
    .number({ required_error: "This field is required" })
    .min(0, { message: "This field must not be smaller than 0" }),
});

export function Prediction() {
  const [result, setResult] = useState("...");

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      co2: 0,
      humidity: 0,
      humidityRatio: 0,
      light: 0,
      temperature: 0,
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
    try {
      const body = {
        co2: data.co2,
        humidity: data.humidity,
        humidityRatio: data.humidityRatio,
        light: data.light,
        temperature: data.temperature,
      };
      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        body: JSON.stringify(body),
      });
      if (response.ok) {
        const responseData = await response.json();
        setResult(responseData);
      }
    } catch (error) {
      throw error;
    }
  }

  return (
    <div className="w-full flex flex-col">
      <div className="md:w-full md:pb-6">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col space-y-6"
          >
            <div className="grid grid-cols-5 gap-4">
              <ControlledInput
                control={form.control}
                name="temperature"
                label="Temperature"
                inputProps={{
                  placeholder: "0.00",
                  type: "number",
                  className: "col-span-1",
                }}
              />
              <ControlledInput
                control={form.control}
                name="humidity"
                label="Humidity"
                inputProps={{
                  placeholder: "0.00",
                  type: "number",
                  className: "col-span-1",
                }}
              />
              <ControlledInput
                control={form.control}
                name="light"
                label="Light"
                inputProps={{
                  placeholder: "0.00",
                  type: "number",
                  className: "col-span-1",
                }}
              />
              <ControlledInput
                control={form.control}
                name="co2"
                label="CO2"
                inputProps={{
                  placeholder: "0.00",
                  type: "number",
                  className: "col-span-1",
                }}
              />
              <ControlledInput
                control={form.control}
                name="humidityRatio"
                label="Humidity Ratio"
                inputProps={{
                  placeholder: "0.00",
                  type: "number",
                  className: "col-span-1",
                }}
              />
            </div>
            <Button type="submit" className="w-1/2 mx-auto">
              Check
            </Button>
          </form>
        </Form>
      </div>
      <div className="md:w-full mt-4 md:mt-0 flex items-center justify-center">
        {/* Display error messages */}
        {Object.values(form.formState.errors).map((error, index) => (
          <label key={index} className="text-red-500">
            {error.message}
          </label>
        ))}
        <label className="text-6xl text-center">
          {`Room Occupancy: ${result ?? "..."}`}
        </label>
      </div>
    </div>
  );
}

from fastapi import FastAPI

app = FastAPI(
    title="MedLink AI Service",
    description="AI microservice for the MedLink platform, providing medical predictions and insights.",
    version="1.0.0",
)


@app.get(
    "/",
    tags=["Root"],
    summary="Root endpoint",
    description="Welcome endpoint to verify the service is accessible.",
)
async def root():
    """
    Root endpoint that returns a welcome message.
    """
    return {
        "success": True,
        "message": "Welcome to MedLink AI Service"
    }


@app.get(
    "/health",
    tags=["Health"],
    summary="Health check endpoint",
    description="Checks the health status of the MedLink AI Service.",
)
async def health_check():
    """
    Health check endpoint to ensure the service is running correctly.
    """
    return {
        "success": True,
        "service": "MedLink AI Service",
        "status": "Running"
    }

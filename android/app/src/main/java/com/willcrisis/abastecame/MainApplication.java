package com.willcrisis.abastecame;

import android.annotation.SuppressLint;
import android.app.Application;

import com.facebook.CallbackManager;
import com.facebook.appevents.AppEventsLogger;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

import co.apptailor.googlesignin.RNGoogleSigninPackage;
import io.invertase.firebase.RNFirebasePackage;
import io.invertase.firebase.auth.RNFirebaseAuthPackage;
import io.invertase.firebase.fabric.crashlytics.RNFirebaseCrashlyticsPackage;
import io.invertase.firebase.firestore.RNFirebaseFirestorePackage;
import io.invertase.firebase.perf.RNFirebasePerformancePackage;
import io.invertase.firebase.storage.RNFirebaseStoragePackage;

// optional packages - add/remove as appropriate

public class MainApplication extends Application implements ReactApplication {

  private static CallbackManager mCallbackManager = CallbackManager.Factory.create();

  protected static CallbackManager getCallbackManager() {
    return mCallbackManager;
  }

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @SuppressLint("MissingPermission")
    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.asList(
        new MainReactPackage(),
        new FBSDKPackage(mCallbackManager),
        new RNGoogleSigninPackage(),
        new RNFirebasePackage(),
        // add/remove these packages as appropriate
//        new RNFirebaseAdMobPackage(),
//        new RNFirebaseAnalyticsPackage(),
        new RNFirebaseAuthPackage(),
//        new RNFirebaseRemoteConfigPackage(),
        new RNFirebaseCrashlyticsPackage(),
//        new RNFirebaseDatabasePackage(),
        new RNFirebaseFirestorePackage(),
//        new RNFirebaseFunctionsPackage(),
//        new RNFirebaseInstanceIdPackage(),
//        new RNFirebaseInvitesPackage(),
//        new RNFirebaseLinksPackage(),
//        new RNFirebaseMessagingPackage(),
//        new RNFirebaseNotificationsPackage(),
        new RNFirebasePerformancePackage(),
        new RNFirebaseStoragePackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
    AppEventsLogger.activateApp(this);
  }
}
